import { CalanderBodyService } from './../calander-body.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { CalanderDialogComponent } from '../calander-dialog/calander-dialog.component';

declare const Twilio: any;

export interface bodyModel {
  title: string;
  start: string;
  end: string;
  body: string;
  attendees: string;
}

@Component({
  selector: 'app-call-us',
  templateUrl: './call-us.component.html',
  styleUrls: ['./call-us.component.scss'],
})
export class CallUsComponent implements OnInit {
  // Twillio Variables

  Twilio: any;
  connection: any = null;
  phoneNumber: any;
  device: any;
  callStatusList: any;
  callHideShow: any = true;
  stopHideShow: any = false;
  msg: string = '';
  time: string = '';
  msg1: string = '';

  // Date time Variables

  today = new Date();
  afterThirtyMins: string = '';
  afterFOrtyFiveMins: string = '';
  afterOneHour: string = '';
  AfterOneHourFifteenMins: string = '';

  //Display time on UI format variables

  displayFormatFOrThirtyMins: string = '';
  displayFormatForOneHour: string = '';
  displayFormatFOrFortyFIveMins: string = '';
  displayFormatForOneHourFifteenMins: string = '';

  apiFormatForThirtyMins: string = '';
  apiFormatForFOrFortyFIveMins: string = '';
  apiFormatForForOneHour: string = '';
  apiFormatForTOneHourFifteenMins: string = '';

  //calendar event variables
  conversationId:any = ''
  body: bodyModel = {
    title: 'U wordt gebeld met snelstart om',
    start: '',
    end: '',
    body: '',
    attendees: 'demo@ariqt.com', //Customer's mail ID here
  };
  constructor(
    public _http: HttpClient,
    private _calander: CalanderBodyService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetTimeInRequiredFormat();
   this.conversationId= sessionStorage.getItem('storedSessionId')
    this._http
      .get('https://demotwilio.azurewebsites.net/api/Token/token', {
        responseType: 'text',
      })
      .subscribe((data) => {
        // debugger
        // console.log(data);
        this.device = Twilio.Device.setup(data, { debug: true });
        this.setupHandlers(this.device);
        // console.log(this.device);
      });
  }

  setupHandlers(device: any) {
    device.on('ready', (_device: any) => {
      this.updateCallStatus('Ready to call');
    });
    device.on('error', (error: any) => {
      this.updateCallStatus('ERROR: ' + error.message);
    });
    device.on('connect', (connection: any) => {
      if ('phoneNumber' in connection.message) {
        this.updateCallStatus('In call with ' + connection.message.phoneNumber);
        this.callHideShow = false;
        this.stopHideShow = true;
      } else {
        this.updateCallStatus('In call with support');
      }
    });
    device.on('disconnect', (connection: any) => {
      this.updateCallStatus('Call End');
      this.stopHideShow = false;
      this.callHideShow = true;
    });
  }
  updateCallStatus(status: string): void {
    // console.log('Status -> ', this.callStatusList);
  }
  callCustomer() {
    this.phoneNumber = this.msg;
    this.updateCallStatus('Calling ' + this.phoneNumber + '...');
    var params = { phoneNumber:  this.phoneNumber };
    this.device.connect(params);
  }
  Stop() {
    this.device.disconnectAll();
    this.stopHideShow = false;
    this.callHideShow = true;
  }

  GetTimeInRequiredFormat() {
    // debugger;
    this.afterThirtyMins = moment().add(30, 'm').format('YYYY-MM-DDThh:mm:ss');
    this.afterFOrtyFiveMins = moment()
      .add(45, 'm')
      .format('YYYY-MM-DDThh:mm:ss');
    this.afterOneHour = moment().add(1, 'h').format('YYYY-MM-DDThh:mm:ss');
    this.AfterOneHourFifteenMins = moment()
      .add(75, 'm')
      .format('YYYY-MM-DDThh:mm:ss');

    this.displayFormatFOrThirtyMins = moment().add(30, 'm').format('hh:mm');
    this.displayFormatFOrFortyFIveMins = moment().add(45, 'm').format('hh:mm');
    this.displayFormatForOneHour = moment().add(60, 'm').format('hh:mm');
    this.displayFormatForOneHourFifteenMins = moment()
      .add(75, 'm')
      .format('hh:mm');

    this.apiFormatForThirtyMins = moment()
      .add(30, 'm')
      .format('YYYY-MM-DDTHH:mm:ss');
    this.apiFormatForFOrFortyFIveMins = moment()
      .add(45, 'm')
      .format('YYYY-MM-DDTHH:mm:ss');
    this.apiFormatForForOneHour = moment()
      .add(60, 'm')
      .format('YYYY-MM-DDTHH:mm:ss');
    this.apiFormatForTOneHourFifteenMins = moment()
      .add(75, 'm')
      .format('YYYY-MM-DDTHH:mm:ss');
  }

  CalendarFOrThirtyMins() {
    debugger;
    this._dialog.open(CalanderDialogComponent);
    if (this.displayFormatFOrThirtyMins != '') {
      // this.body.body = "Chatgeschiedenis van klant -- "+ "http://localhost:8080/chatHistory/"+this.conversationId       // Local
      console.log(this.body.body)
      this.body.body = "Chatgeschiedenis van klant -- "+ "https://operatorfrontend.azurewebsites.net/chatHistory/"+this.conversationId        //Deployed
      // this.body.body = "Chatgeschiedenis van klant -- "+ "https://operatorfrontend-test.azurewebsites.net/chatHistory/"+this.conversationId     //Deployed-Test
      this.body.start = this.apiFormatForThirtyMins;
      this.body.end = this.apiFormatForFOrFortyFIveMins;
      this._calander.sendBody.subscribe((mailId: string) => { 
        this.body.attendees = mailId;
      });
      this.postCalendar();
    }
  }

  CalendarFOrOneHour() {
    this._dialog.open(CalanderDialogComponent);
    if (this.displayFormatForOneHour != '') {
      debugger
      this.body.body = "Chatgeschiedenis van klant -- "+ "http://localhost:8080/chatHistory/"+ this.conversationId          // Local
      // this.body.body = "Chatgeschiedenis van klant -- "+ "https://operatorfrontend.azurewebsites.net/chatHistory/"+this.conversationId        //Deployed
      this.body.body = "Chatgeschiedenis van klant -- "+ "https://operatorfrontend-test.azurewebsites.net/chatHistory/"+this.conversationId     //Deployed-Test/
      console.log(this.body.body)
      this.body.start = this.apiFormatForForOneHour;
      this.body.end = this.apiFormatForTOneHourFifteenMins;
      this._calander.sendBody.subscribe((mailId: string) => {
        this.body.attendees = mailId;
      });
      this.postCalendar();
    }
  }

  postCalendar() {
    debugger;
    this._http
      .post<any>(
        'https://calendareventcreation.azurewebsites.net/api/Event',
        this.body ,{responseType: 'text' as 'json'}
      )
      .subscribe((data) => {
        // console.log(data);
      });
  }
}
