import { Component, OnInit } from '@angular/core';
import { ClosedEventEmitterService } from '../closed-event-emitter.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  chatBoxShowStatus: boolean = true;
  chatTurnedOn: boolean = true;

  constructor(private _closedEvent: ClosedEventEmitterService) {}
  sessionId: any;

  ngOnInit() {
    this.sessionId = uuidv4();
    sessionStorage.setItem('storedSessionId', this.sessionId);

    var page = location.href;
    var pagearray = page.split('/');
    var pagename = 'Start';
    if (pagearray.length == 4) {
      pagename = pagearray[3];
      console.log(pagename);
    }
  }

  toggleBetweenChatNCall(btnClicked: any) {
    if (btnClicked == 'chat') {
      this.chatTurnedOn = true;
    } else if (btnClicked == 'call') {
      this.chatTurnedOn = false;
    }
  }

  closeThis() {
    this._closedEvent.chatClosed.emit(false);
  }
}
