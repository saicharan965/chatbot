import { EventEmitter, Injectable, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CalanderBodyService {

  @Output() sendBody: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
