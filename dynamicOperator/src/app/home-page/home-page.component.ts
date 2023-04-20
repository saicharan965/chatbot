import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { io } from 'socket.io-client';
import { NewCustomerComponent } from '../new-customer/new-customer.component';
import { RoomIdService } from '../room-id.service';
import { viewContainerRefDirective } from '../viewContainer';

const SOCKET_ENDPOINT = 'localhost:3000';
// const SOCKET_ENDPOINT = 'https://chatbotwebsocket.herokuapp.com/'; //LIVE 
// const SOCKET_ENDPOINT = 'https://yousufchatbot.herokuapp.com/';        //TEST

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  socket: any;
  @ViewChild(viewContainerRefDirective)
  createComponent!: viewContainerRefDirective;

  constructor(
    private _CRF: ComponentFactoryResolver,
    private _roomId: RoomIdService
  ) {}

  ngOnInit(): void {
    this.socket = io(SOCKET_ENDPOINT);
    this.socketHandlers();

    this._roomId.operatorMessage.subscribe((operatorMsg: any) => {
      this.socket.emit('OperatorMessage', operatorMsg);
    });
  }

  socketHandlers() {
    this.socket.on('connect', () => {
      // console.log("You're now connected to backend node server");
    });

    this.socket.on('RequestOperatorToJoin', (roomId: any) => {
      this.socket.emit('RequestToJoin', roomId);

      const componentFactory =
        this._CRF.resolveComponentFactory(NewCustomerComponent);
      const compoRef =
        this.createComponent._viewCOntainerRef.createComponent(
          componentFactory
        );
      compoRef.instance.recivedRoomId = roomId;
      this._roomId.roomId.subscribe((roomID: any) => {
        if (roomId == roomID) {
          this.socket.on('CustomerMessageToOperator', (data: any) => {
            // console.log(data.roomId);
            // console.log(data.input);
            compoRef.instance.subscriptionInit();
            this._roomId.customerMessage.emit(data);
            compoRef.instance.subscriptionDestroy();
          });
          this.socket.on('dfresponseToOperator', (data: any) => {
            compoRef.instance.subscriptionForDialogflow();
            this._roomId.DFResponse.emit(data);
            compoRef.instance.DestroySubscriptionForDialogflow();
          });

          this.socket.on('handOfftoOperator', (data: any) => {
            compoRef.instance.disableInput = false;
            compoRef.instance.handOffMessageSubscription();
            this._roomId.HandOffMessage.emit(data);
            compoRef.instance.handOffMessageDestroy();
          });
        }
      });
    });

    this.socket.on('customerDisconnect', (discMsg: any) => {
      console.log(discMsg + ' disconnected');
      // this.createComponent._viewCOntainerRef.clear();
    });
  }
}
