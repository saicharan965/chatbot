import { RoomIdService } from './../room-id.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss'],
})
export class NewCustomerComponent implements OnInit {
  customerMsgSub: Subject<object> = new Subject();
  @Input() recivedRoomId: any = '';
  inputId = ''
  customerMessage: any = '';
  CustomerSub: Subscription | undefined;
  OperatorSub: Subscription | undefined;
  handOffMessageSub: Subscription | undefined;
  linkMsgs: any;
  buttonMsgs: any;
  inputValue: any;
  InputMessage: string = '';
  intentNames: any[] = [];
  disableInput: boolean = true;

  constructor(private _roomId: RoomIdService) {}

  ngOnInit(): void {
    if (this.recivedRoomId != '') {
      this.inputId = "input-"+this.recivedRoomId
      this._roomId.roomId.emit(this.recivedRoomId);
    }
  }

  subscriptionInit() {
    this.CustomerSub = this._roomId.customerMessage.subscribe((data: any) => {
      // debugger;
      if (data.roomId == this.recivedRoomId) {
        this.customerMessage = data.input;
        const textMessage = document.createElement('li');
        textMessage.innerHTML = data.input;
        textMessage.style.background = '#81C784';
        textMessage.style.padding = '5px 10px';
        textMessage.style.margin = '10px';
        textMessage.style.textAlign = 'left';
        textMessage.classList.add('message' + data.roomId);
        textMessage.style.borderRadius = '10px 10px 10px 0px';
        document?.getElementById(this.recivedRoomId)?.appendChild(textMessage);
      }
    });
  }
  subscriptionDestroy() {
    this.CustomerSub?.unsubscribe();
  }

  subscriptionForDialogflow() {
    this.OperatorSub = this._roomId.DFResponse.subscribe(
      (ResponseArray: any) => {
        // debugger;
        if (ResponseArray.roomId == this.recivedRoomId) {
          var responses = ResponseArray.response;
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
            textMessage.style.borderRadius = '10px 10px 10px 0px';
            document
              ?.getElementById(this.recivedRoomId)
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
                textMessage.style.borderRadius = '10px 10px 10px 0px';
                document
                  ?.getElementById(this.recivedRoomId)
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

              document?.getElementById(this.recivedRoomId)?.appendChild(link);
              this.linkMsgs = '';
            }
            if (this.buttonMsgs[0].structValue.fields.text.stringValue != '') {
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
                  ?.getElementById(this.recivedRoomId)
                  ?.appendChild(chipsResponse);
              });
            }
          }
        }
      }
    );
  }
  DestroySubscriptionForDialogflow() {
    this.OperatorSub?.unsubscribe();
  }

  handOffMessageSubscription() {
    this.handOffMessageSub = this._roomId.HandOffMessage.subscribe(
      (data: any) => {
        // debugger;
        if (data.roomId == this.recivedRoomId) {
          // this.disableInput = false;

          this.customerMessage = data.input;
          const textMessage = document.createElement('li');
          textMessage.innerHTML = data.input;
          textMessage.style.background = '#68b8e7';
          textMessage.style.padding = '5px 10px';
          textMessage.style.margin = '10px';
          textMessage.style.textAlign = 'left';
          textMessage.classList.add('message' + data.roomId);
          textMessage.style.borderRadius = '10px 10px 10px 0px';
          document
            ?.getElementById(this.recivedRoomId)
            ?.appendChild(textMessage);
        }
      }
    );
  }
  handOffMessageDestroy() {
    this.handOffMessageSub?.unsubscribe();
  }
  sendMessageToParent(msg: any) {
    const textMessage = document.createElement('li');
    textMessage.innerHTML = msg;
    textMessage.style.background = '#F1948A';
    textMessage.style.padding = '5px 10px';
    textMessage.style.margin = '10px';
    textMessage.style.textAlign = 'right';
    textMessage.style.borderRadius = '10px 10px 0px 10px';
    document?.getElementById(this.recivedRoomId)?.appendChild(textMessage);

    this._roomId.operatorMessage.emit({
      input: msg,
      roomId: this.recivedRoomId,
    });
  }
}
