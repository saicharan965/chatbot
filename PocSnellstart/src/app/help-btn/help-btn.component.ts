import { Component, OnInit } from '@angular/core';
import { ClosedEventEmitterService } from '../closed-event-emitter.service';

@Component({
  selector: 'app-help-btn',
  templateUrl: './help-btn.component.html',
  styleUrls: ['./help-btn.component.scss'],
})
export class HelpBtnComponent implements OnInit {
  isShown: boolean = false;
  showFaq: boolean = false;
  showChat: boolean = false;
  constructor(private _closedEvent: ClosedEventEmitterService) {}

  ngOnInit(): void {
    this._closedEvent.chatClosed.subscribe((result) => {
      this.showChat = result;
    });
  }

  toggleShow() {
    this.showChat = !this.showChat;
  }
}
