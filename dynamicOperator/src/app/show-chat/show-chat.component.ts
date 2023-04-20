import { RoomIdService } from './../room-id.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-chat',
  templateUrl: './show-chat.component.html',
  styleUrls: ['./show-chat.component.scss']
})
export class ShowChatComponent implements OnInit {

  constructor(private _roomId: RoomIdService) { }

  ngOnInit(): void {
  }

catchCOnvoId(){
this._roomId.convoId.subscribe((convoId)=>{
  console.log(convoId)
})
}

}
