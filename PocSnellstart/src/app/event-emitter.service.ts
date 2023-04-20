import { EventEmitter, Injectable, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  @Output() sendPageName: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
