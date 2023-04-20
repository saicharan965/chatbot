import { FaqContainerComponent } from './../faq-container/faq-container.component';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitterService } from './../event-emitter.service';
import { ChatHistoryService } from './../chat-history.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

import { io } from 'socket.io-client';
// import { v4 as uuidv4 } from 'uuid';

interface operatorChatHistory {
  conversationId: string;
  question: string;
  operatorAnswer: string;
  cusomterEmail: string;
}

interface botChatHistory {
  conversationId: string;
  question: string;
  botAnswer: any;
  cusomterEmail: string;
}

const SOCKET_ENDPOINT = 'localhost:3000';
// const SOCKET_ENDPOINT = 'https://chatbotwebsocket.herokuapp.com/'; //LIVE
// const SOCKET_ENDPOINT = 'https://yousufchatbot.herokuapp.com/'; //TEST
@Component({
  selector: 'app-chat-with-us',
  templateUrl: './chat-with-us.component.html',
  styleUrls: ['./chat-with-us.component.scss'],
})
export class ChatWithUsComponent implements OnInit {
  @Input() roomId: any;
  socket: any;
  // roomId = '';

  sendCustomerMsg: any;
  linkMsgs: any;
  buttonMsgs: any;
  inputValue: any;
  InputMessage: string = '';
  intentNames: any[] = [];

  postBodyApiForOperator: operatorChatHistory = {
    conversationId: '',
    question: '',
    operatorAnswer: '',
    cusomterEmail: 'demo@ariqt.com',
  };

  postBodyAPIForBot: botChatHistory = {
    conversationId: '',
    question: '',
    botAnswer: '',
    cusomterEmail: 'demo@ariqt.com',
  };

  retrivedSessionId!: any;
  chatDetails: any[] = [];
  faqresult: any;
  btnList: string[] = [];


  showFAQ:boolean = false
  constructor(
    private _http: HttpClient,
    private _ChatHistory: ChatHistoryService,
    private _eventEmitter: EventEmitterService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.socket = io(SOCKET_ENDPOINT);
    this.retrivedSessionId = sessionStorage.getItem('storedSessionId');
    if (this.retrivedSessionId != undefined || this.retrivedSessionId != null) {
      this.getData(this.retrivedSessionId);
      this.socketHandlers();
    } else if (
      this.retrivedSessionId == undefined &&
      this.retrivedSessionId == null
    ) {
      this.socketHandlers();
    }
    var page = location.href;
    var pagearray = page.split('/');
    var pagename = 'Start';
    if (pagearray.length == 4) {
      pagename = pagearray[3];
      this.ifPageName(pagename);
    }

    this.pagename();
  }

  socketHandlers() {
    this.socket.on('connect', () => {
      // console.log("You're now connected to backend node server");
      // this.roomId = uuidv4();
      // debugger;
      this.socket.emit('RequestToJoin', this.roomId);
      this.socket.on('sendTextMessageToCustomer', (message: any) => {
        // debugger;
        if (message.roomId == this.roomId) {
          // console.log(message.input);                                // Operator Message
          this.postBodyApiForOperator.operatorAnswer = message.input;
          this._http
            .post(
              'https://chatbotelasticapi.azurewebsites.net/api/ChatHistory/operator',
              this.postBodyApiForOperator
            )
            .subscribe((data: any) => {
              console.log(data);
            });
          const element = document.createElement('li');
          element.innerHTML = message.input;
          element.style.background = '#F1948A';
          element.style.padding = '8px';
          element.style.margin = '5px';
          element.style.textAlign = 'left';
          element.style.borderRadius = '0px 10px 10px 0px';
          document?.getElementById('chat-message')?.appendChild(element);
        }
      });
    });

    this.socket.on('JoinedNotification', (welcomeMessage: string) => {
      // console.log(welcomeMessage);
    });
    this.socket.on('dfResponseToCustomer', (ResponseArray: any) => {
      // debugger;
      var responses = ResponseArray;

      this.postBodyAPIForBot.botAnswer = responses;
      this._http
        .post(
          'https://chatbotelasticapi.azurewebsites.net/api/ChatHistory',
          this.postBodyAPIForBot
        )
        .subscribe((data: any) => {
          console.log(data);
        });

      this.intentNames.push(responses.queryResult.intent.displayName);
      // console.log(this.intentNames);
      var textMessagesArray = responses.queryResult.fulfillmentText;

      if (
        responses.queryResult.fulfillmentText != '' &&
        responses.queryResult.fulfillmentMessages.length == 1
      ) {
        // console.log(responses.queryResult.fulfillmentText);
        const textMessage = document.createElement('li');
        textMessage.innerHTML = textMessagesArray;
        textMessage.style.background = '#68b8e7';
        textMessage.style.padding = '5px 10px';
        textMessage.style.margin = '10px';
        textMessage.style.textAlign = 'left';
        textMessage.classList.add('btn');
        textMessage.classList.add('btn-sm');
        textMessage.style.borderRadius = '10px 10px 10px 0px';
        document?.getElementById('chat-message')?.appendChild(textMessage);
      } else {
        var richContentArray =
          responses.queryResult.fulfillmentMessages[1].payload.fields
            .richContent.listValue.values[0].listValue.values;

        if (textMessagesArray != '') {
          // console.log(textMessagesArray);
        }

        if (richContentArray.length == 1) {
          if (
            richContentArray[0].structValue.fields.type.stringValue == 'button'
          ) {
            this.linkMsgs =
              responses.queryResult.fulfillmentMessages[1].payload.fields.richContent.listValue.values[0].listValue.values[0].structValue.fields.link.stringValue;
          } else {
            this.buttonMsgs =
              responses.queryResult.fulfillmentMessages[1].payload.fields.richContent.listValue.values[0].listValue.values[0].structValue.fields.options.listValue.values;
          }
        }

        if (richContentArray.length > 1) {
          this.linkMsgs =
            responses.queryResult.fulfillmentMessages[1].payload.fields.richContent.listValue.values[0].listValue.values[0].structValue.fields.link.stringValue;
          this.buttonMsgs =
            responses.queryResult.fulfillmentMessages[1].payload.fields.richContent.listValue.values[0].listValue.values[1].structValue.fields.options.listValue.values;
        }

        var textMsg = responses.queryResult.fulfillmentMessages[0].text.text;
        if (textMsg != '') {
          textMsg.forEach((oneMsg: string) => {
            const textMessage = document.createElement('li');
            textMessage.innerHTML = oneMsg;
            textMessage.style.background = '#00CCFF';
            textMessage.style.padding = '5px 10px';
            textMessage.style.margin = '10px';
            textMessage.style.textAlign = 'left';
            textMessage.classList.add('btn');
            textMessage.classList.add('btn-sm');
            textMessage.style.borderRadius = '10px 10px 10px 0px';
            document?.getElementById('chat-message')?.appendChild(textMessage);
          });
        }
        if (this.linkMsgs != undefined && this.linkMsgs != '') {
          const link = document.createElement('a');

          link.innerHTML = 'Bekijk meer';
          link.href = this.linkMsgs;
          link.target = `_blank`;
          link.classList.add('btn');
          link.classList.add('btn-sm');
          link.style.background = '#68b8e7';

          link.style.margin = '10px';
          link.style.textAlign = 'left';

          document?.getElementById('chat-message')?.appendChild(link);
          this.linkMsgs = '';
        }
        if (this.buttonMsgs[0].structValue.fields.text.stringValue != '') {
          this.buttonMsgs.forEach((data: any) => {
            const chipsResponse = document.createElement('button');
            chipsResponse.innerHTML = data.structValue.fields.text.stringValue;
            chipsResponse.style.background = '#F5B041';
            chipsResponse.classList.add('ChipsResponse');
            chipsResponse.classList.add('btn');
            chipsResponse.classList.add('btn-sm');
            chipsResponse.style.margin = '5px';
            chipsResponse.style.textAlign = 'left';
            chipsResponse.style.display = 'flex-inline';
            chipsResponse.id = data.structValue.fields.text.stringValue;
            document
              ?.getElementById('chat-message')
              ?.appendChild(chipsResponse);
          });
        }
      }
    });
  }

  sendMessage(InputValue: string) {
    if (InputValue != '') {
      if (
        this.intentNames.includes('manual') ||
        this.intentNames.includes('Default Fallback Intent - fallback')
      ) {
        // debugger;
        this.socket.emit('handOff', { input: InputValue, roomId: this.roomId });
        this.postBodyApiForOperator.conversationId = this.roomId;
        this.postBodyApiForOperator.question = InputValue;
      } else {
        // debugger;
        this.socket.emit('CustomerTextMessage', {
          input: InputValue,
          roomId: this.roomId,
        }); // Emitting customer's message to server

        this.postBodyAPIForBot.conversationId = this.roomId;
        this.postBodyAPIForBot.question = InputValue;
      }

      const element = document.createElement('li');
      element.innerHTML = InputValue;
      element.setAttribute('id', 'CustomerTextMessage');
      element.style.width = '100%';
      element.style.backgroundColor = '#81C784';
      element.style.borderRadius = '10px 10px 0px 10px';
      element.style.textAlign = 'right';
      element.style.padding = '8px';
      element.style.margin = '5px';
      document?.getElementById('chat-message')?.append(element);
    }
  }

  findWhich(event: any) {
    // debugger;
    if (event.target.innerHTML == event.target.id) {
      this.InputMessage = event.target.innerHTML;
      this.sendMessage(this.InputMessage);
      this.InputMessage = '';
    }
  }

  //GET DATA HERE

  getData(conversationId: string) {
    this._ChatHistory.getChat(conversationId).subscribe((chatData: any) => {
      if (chatData.chats != null) {
        this.chatDetails = chatData.chats;
      }

      // debugger;

      if (chatData.conversationId == conversationId) {
        this.chatDetails.forEach((element: any) => {
          if (element.botAnswer != null) {
            console.log(element);
            const customerMessage = document.createElement('li');
            customerMessage.innerHTML = element.question;
            customerMessage.setAttribute('id', 'CustomerTextMessage');
            customerMessage.style.width = '100%';
            customerMessage.style.backgroundColor = '#81C784';
            customerMessage.style.borderRadius = '10px 10px 10px 10px';
            customerMessage.style.textAlign = 'right';
            customerMessage.style.padding = '8px';
            customerMessage.style.margin = '5px';
            document?.getElementById('chat-message')?.append(customerMessage);

            var responses = element.botAnswer;

            var textMessagesArray = responses.queryResult.fulfillmentText;

            if (
              responses.queryResult.fulfillmentText != '' &&
              responses.queryResult.fulfillmentMessages.length == 1
            ) {
              // console.log(responses.queryResult.fulfillmentText);
              const textMessage = document.createElement('li');
              textMessage.innerHTML = textMessagesArray;
              textMessage.style.background = '#68b8e7';
              textMessage.style.padding = '5px 10px';
              textMessage.style.margin = '10px';
              textMessage.style.textAlign = 'left';
              textMessage.style.borderRadius = '10px 10px 10px 10px';
              document
                ?.getElementById('chat-message')
                ?.appendChild(textMessage);
            } else {
              var richContentArray =
                responses.queryResult.fulfillmentMessages[1].payload.fields
                  .richContent.listValue.values[0].listValue.values;

              if (textMessagesArray != '') {
                // console.log(textMessagesArray);
              }

              if (richContentArray.length == 1) {
                if (
                  richContentArray[0].structValue.fields.type.stringValue ==
                  'button'
                ) {
                  this.linkMsgs =
                    responses.queryResult.fulfillmentMessages[1].payload.fields.richContent.listValue.values[0].listValue.values[0].structValue.fields.link.stringValue;
                } else {
                  this.buttonMsgs =
                    responses.queryResult.fulfillmentMessages[1].payload.fields.richContent.listValue.values[0].listValue.values[0].structValue.fields.options.listValue.values;
                }
              }

              if (richContentArray.length > 1) {
                this.linkMsgs =
                  responses.queryResult.fulfillmentMessages[1].payload.fields.richContent.listValue.values[0].listValue.values[0].structValue.fields.link.stringValue;
                this.buttonMsgs =
                  responses.queryResult.fulfillmentMessages[1].payload.fields.richContent.listValue.values[0].listValue.values[1].structValue.fields.options.listValue.values;
              }

              var textMsg =
                responses.queryResult.fulfillmentMessages[0].text.text;
              if (textMsg != '') {
                textMsg.forEach((oneMsg: string) => {
                  const textMessage = document.createElement('li');
                  textMessage.innerHTML = oneMsg;
                  textMessage.style.background = '#00CCFF';
                  textMessage.style.padding = '5px 10px';
                  textMessage.style.margin = '10px';
                  textMessage.style.textAlign = 'left';

                  textMessage.style.borderRadius = '10px 10px 10px 10px';
                  document
                    ?.getElementById('chat-message')
                    ?.appendChild(textMessage);
                });
              }
              if (this.linkMsgs != undefined && this.linkMsgs != '') {
                const link = document.createElement('a');

                link.innerHTML = 'Bekijk meer';
                link.href = this.linkMsgs;
                link.target = `_blank`;
                link.classList.add('btn');
                link.classList.add('btn-sm');
                link.style.background = '#68b8e7';

                link.style.margin = '10px';
                link.style.textAlign = 'left';

                document?.getElementById('chat-message')?.appendChild(link);
                this.linkMsgs = '';
              }
              if (
                this.buttonMsgs[0].structValue.fields.text.stringValue != ''
              ) {
                this.buttonMsgs.forEach((data: any) => {
                  const chipsResponse = document.createElement('button');
                  chipsResponse.innerHTML =
                    data.structValue.fields.text.stringValue;
                  chipsResponse.style.background = '#F5B041';
                  chipsResponse.classList.add('ChipsResponse');
                  chipsResponse.classList.add('btn');
                  chipsResponse.classList.add('btn-sm');
                  chipsResponse.style.margin = '5px';
                  chipsResponse.style.textAlign = 'left';
                  chipsResponse.style.display = 'flex-inline';
                  chipsResponse.id = data.structValue.fields.text.stringValue;
                  document
                    ?.getElementById('chat-message')
                    ?.appendChild(chipsResponse);
                });
              }
            }
          } else if (element.operatorAnswer != null) {
            const customerMessage = document.createElement('li');
            customerMessage.innerHTML = element.question;
            customerMessage.setAttribute('id', 'CustomerTextMessage');
            customerMessage.style.width = '100%';
            customerMessage.style.backgroundColor = '#81C784';
            customerMessage.style.borderRadius = '10px 10px 10px 10px';
            customerMessage.style.textAlign = 'right';
            customerMessage.style.padding = '8px';
            customerMessage.style.margin = '5px';
            document?.getElementById('chat-message')?.append(customerMessage);

            const operatorAns = document.createElement('li');
            operatorAns.innerHTML = element.operatorAnswer;
            operatorAns.style.background = '#F1948A';
            operatorAns.style.padding = '8px';
            operatorAns.style.margin = '5px';
            operatorAns.style.textAlign = 'left';
            operatorAns.style.borderRadius = '10px 10px 10px 10px';
            document?.getElementById('chat-message')?.appendChild(operatorAns);
          }
        });
      }
    });
  }

  pagename() {
    this._eventEmitter.sendPageName.subscribe((pageName) => {
      this.ifPageName(pageName);
    });
  }

  ifPageName(PageName: any) {
    if (PageName == '') {
      this.btnList = ['verkopen', 'overig'];
    }
    if (PageName == 'financial') {
      this.btnList = ['financial1', 'financial2'];
    }
    if (PageName == 'quotations') {
      this.btnList = ['quotation', 'quotations2'];
    }
    if (PageName == 'invoices') {
      this.btnList = ['invoices', 'invoices2'];
    }
    if (PageName == 'shopping') {
      this.btnList = ['Inkoopfacturen', 'Leveranciers'];
    }
    if (PageName == 'cashandbank') {
      this.btnList = [
        'Automatische bankkoppelingen',
        'Bankafschriften inlezen',
      ];
    }
    if (PageName == 'relationships') {
      this.btnList = ['relationships', 'relationships2'];
    }
    if (PageName == 'articles') {
      this.btnList = ['articles', 'articles2'];
    }
    if (PageName == 'links') {
      this.btnList = ['Links1', 'Links 2'];
    }
  }

  hitDialogflow(event: any) {
    this.InputMessage = event.target.innerHTML;
    this.sendMessage(event.target.innerHTML);
  }

openFaq(){
  var page = location.href;
    var pagearray = page.split('/');
    var pagename = 'Start';
    if (pagearray.length == 4) {
      pagename = pagearray[3];
    }
    var context = 'Start';
    if (pagename == 'financial') {
      context = 'Financial';
    }
    if (pagename == 'quotations') {
      context = 'Quotations';
    }
    if (pagename == 'invoices') {
      context = 'Invoices';
    }
    if (pagename == 'shopping') {
      context = 'Shopping';
    }
    if (pagename == 'cashandbank') {
      context = 'Cash and Bank';
    }
    if (pagename == 'relationships') {
      context = 'RelationShips';
    }
    if (pagename == 'articles') {
      context = 'Articles';
    }
    if (pagename == 'links') {
      context = 'Link';
    }
    var contextdata = {
      Context: context,
    };
    this._http
      .post<any>('https://demotwilio.azurewebsites.net/api/Faq', contextdata)
      .subscribe((data: any) => {
        this.faqresult = data;
      });
  }

}
