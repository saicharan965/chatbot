import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatHistoryService } from '../chat-history.service';
import { RoomIdService } from '../room-id.service';

@Component({
  selector: 'app-new-customer-chat',
  templateUrl: './new-customer-chat.component.html',
  styleUrls: ['./new-customer-chat.component.scss'],
})
export class NewCustomerChatComponent implements OnInit {
  chatDetails: any[] = [];
  linkMsgs: any;
  buttonMsgs: any;
  inputValue: any;
  InputMessage: string = '';
  intentNames: any[] = [];
  conversationId: any;
  constructor(
    private _ChatHistory: ChatHistoryService,
    private _roomId: RoomIdService,private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    debugger
    this.conversationId = this.route.snapshot.paramMap.get('id');
    this.getData(this.conversationId);
  }
  getData(conversationId: string) {
    debugger;
    this._ChatHistory.getChat(conversationId).subscribe((chatData: any) => {
      debugger;
      this._roomId.convoId.emit(conversationId);
      this.chatDetails = chatData.chats;
      if (chatData.conversationId == conversationId) {
        this.chatDetails.forEach((element: any) => {
          if (element.botAnswer != null) {
            // debugger
            console.log(element);
            const customerMessage = document.createElement('li');
            customerMessage.innerHTML =
              'Customer Question :--' + element.question;
            customerMessage.setAttribute('id', 'CustomerTextMessage');
            customerMessage.style.width = '100%';
            customerMessage.style.backgroundColor = '#81C784';
            customerMessage.style.borderRadius = '10px 10px 10px 10px';
            customerMessage.style.textAlign = 'left';
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
            customerMessage.innerHTML =
              'Customer Question :--' + element.question;
            customerMessage.setAttribute('id', 'CustomerTextMessage');
            customerMessage.style.width = '100%';
            customerMessage.style.backgroundColor = '#81C784';
            customerMessage.style.borderRadius = '10px 10px 10px 10px';
            customerMessage.style.textAlign = 'left';
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
}
