var app = require("express")();
var http = require("http").createServer(app);
require("dotenv").config();
const dialogflow = require("@google-cloud/dialogflow");
const port = process.env.PORT || 3000;
const io = require("socket.io")(http, {
  cors: {
    origins: ["*"],
  },
});

users = [];
var responseArray = io.on("connect", (socket) => {
  console.log("Connection has started");
  socket.on("RequestToJoin", (roomId) => {
    if (users.includes(roomId)) {
      console.log("Joining existing room with ID -" + roomId);
      socket.join(roomId);
      socket
        .to(roomId)
        .emit(
          "JoinedNotification",
          "An operator has joined the session...Your session Id is - " + roomId
        );
    } else {
      users.push(roomId);
      // console.log(users);
      socket.join(roomId);
      socket.broadcast.emit("RequestOperatorToJoin", roomId);
      console.log("Creating a new room with ID - " + roomId + " and joining");
    }

    socket.on("OperatorMessage", (data) => {
      console.log(data);
      if (data.roomId == roomId) {
        socket.to(data.roomId).emit("sendTextMessageToCustomer", data);
      }
    });

    socket.on("CustomerTextMessage", (data) => {
      socket.to(roomId).emit("CustomerMessageToOperator", data);
      queryText = data.input;
      angularSessionId = data.roomId;
      runSample((queryText, (projectId = "snelstart-nchf")));
      setTimeout(function () {
        socket.emit("dfResponseToCustomer", responseArray);
      }, 1500);
      setTimeout(() => {
        socket.to(roomId).emit("dfresponseToOperator", {
          response: responseArray,
          roomId: roomId,
        });
      }, 3000);
    });

    socket.on("handOff", (data) => {
      if (data.roomId == roomId) {
        console.log(data.input);
        socket.to(roomId).emit("handOfftoOperator", data);
      }
    });

    socket.on("disconnect", () => {
      console.log(roomId + " disconnected");
      socket.to(roomId).emit("customerDisconnect", roomId);
      users = users.filter((item) => item !== roomId);
      // console.log(users);
    });
  });
});

// DF starts

/**
 * @param {string} projectId
 */
// async function runSample(projectId = "chatbot-gejo") {
async function runSample(projectId = "snelstart-nchf") {
  const sessionId = angularSessionId;
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "credentials.json",
  });
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: queryText,
        languageCode: "en-US",
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  responseArray = responses[0];
  // console.log("Detected intent");
  const result = responses[0].queryResult;
  // console.log(`  Response: ${result.fulfillmentText}`);
  responseText = result.fulfillmentText;

  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log("  No intent matched.");
  }
}
// DF ends

app.get("/", (req, res) => res.send("hello...!!!"));
http.listen(port, () => {
  console.log(port);
  console.log("listening on *:3000");
});
