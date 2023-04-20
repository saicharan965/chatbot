import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoomIdService {
  @Output() roomId: EventEmitter<any> = new EventEmitter();
  @Output() customerMessage: EventEmitter<any> = new EventEmitter();
  @Output() DFResponse: EventEmitter<any> = new EventEmitter();
  @Output() operatorMessage: EventEmitter<any> = new EventEmitter();
  @Output() HandOffMessage: EventEmitter<any> = new EventEmitter();
  @Output() convoId: EventEmitter<any> = new EventEmitter();
  @Output() ApiData: EventEmitter<any> = new EventEmitter();
  constructor() {}
}
