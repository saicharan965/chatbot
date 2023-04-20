import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClosedEventEmitterService {
  @Output() faqClosed: EventEmitter<any> = new EventEmitter();
  @Output() chatClosed: EventEmitter<any> = new EventEmitter();
  @Output() bothClosedEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}
  faqShowStatus!: boolean;
  chatShowStatus!: boolean;

  bothClosed() {
    this.faqClosed.subscribe((faqClosed) => {
      this.faqShowStatus = faqClosed;
      if (this.chatShowStatus == false && this.faqShowStatus == false) {
        this.bothClosedEvent.emit(false);
      }
    });

    this.chatClosed.subscribe((chatClosed) => {
      this.chatShowStatus = chatClosed;
      if (this.chatShowStatus == false && this.faqShowStatus == false) {
        this.bothClosedEvent.emit(false);
      }
    });
  }

  checkBoth() {
    debugger
    if (this.chatShowStatus == false && this.faqShowStatus == false) {
      this.bothClosedEvent.emit(false);
    }
  }
}
