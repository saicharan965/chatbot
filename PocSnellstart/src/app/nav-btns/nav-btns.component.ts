import { EventEmitterService } from './../event-emitter.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-btns',
  templateUrl: './nav-btns.component.html',
  styleUrls: ['./nav-btns.component.scss']
})
export class NavBtnsComponent implements OnInit {

  constructor(private _router: Router, private _eventEmitter: EventEmitterService) { }

  ngOnInit(): void {
  }

  routeTo(pageName:string){
      this._router.navigate([pageName])
      this._eventEmitter.sendPageName.emit(pageName)
  }
}
