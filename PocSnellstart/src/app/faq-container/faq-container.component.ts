import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClosedEventEmitterService } from '../closed-event-emitter.service';

@Component({
  selector: 'app-faq-container',
  templateUrl: './faq-container.component.html',
  styleUrls: ['./faq-container.component.scss'],
})
export class FaqContainerComponent implements OnInit {
  faqresult: any;
  faqShowStatus: boolean = true;

  constructor(
    public http: HttpClient,
    private _closedEvent: ClosedEventEmitterService
  ) {}

  ngOnInit(): void {
    debugger
    var page = location.href;
    var pagearray = page.split('/');
    var pagename = 'Start';
    if (pagearray.length == 4) {
      pagename = pagearray[3];
    }
    var context = 'Start';
    if (pagename == 'financial') {
      context = 'Financial';
    }
    if (pagename == 'quotations') {
      context = 'Quotations';
    }
    if (pagename == 'invoices') {
      context = 'Invoices';
    }
    if (pagename == 'shopping') {
      context = 'Shopping';
    }
    if (pagename == 'cashandbank') {
      context = 'Cash and Bank';
    }
    if (pagename == 'relationships') {
      context = 'RelationShips';
    }
    if (pagename == 'articles') {
      context = 'Articles';
    }
    if (pagename == 'links') {
      context = 'Link';
    }
    var contextdata = {
      Context: context,
    };
    this.http
      .post<any>('https://demotwilio.azurewebsites.net/api/Faq', contextdata)
      .subscribe((data: any) => {
        this.faqresult = data;
      });
  }

  closeThis() {
    this._closedEvent.faqClosed.emit(false);
  }
}
