import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavBtnsComponent } from './nav-btns/nav-btns.component';
import { FooterComponent } from './footer/footer.component';
import { HelpBtnComponent } from './help-btn/help-btn.component';
import { FaqContainerComponent } from './faq-container/faq-container.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { HttpClientModule } from '@angular/common/http';
import { StartComponent } from './Side-Nav-Components/start/start.component';
import { FinancialComponent } from './Side-Nav-Components/financial/financial.component';
import { QuotationsComponent } from './Side-Nav-Components/quotations/quotations.component';
import { InvoicesComponent } from './Side-Nav-Components/invoices/invoices.component';
import { ShoppingComponent } from './Side-Nav-Components/shopping/shopping.component';
import { CashAndBankComponent } from './Side-Nav-Components/cash-and-bank/cash-and-bank.component';
import { RelationShipsComponent } from './Side-Nav-Components/relation-ships/relation-ships.component';
import { ArticlesComponent } from './Side-Nav-Components/articles/articles.component';
import { LinkComponent } from './Side-Nav-Components/link/link.component';
import { CallUsComponent } from './call-us/call-us.component';
import { ChatWithUsComponent } from './chat-with-us/chat-with-us.component';
import { FormsModule } from '@angular/forms';
import { CalanderDialogComponent } from './calander-dialog/calander-dialog.component';
import { SuccessMessageComponent } from './success-message/success-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBtnsComponent,
    FooterComponent,
    HelpBtnComponent,
    FaqContainerComponent,
    ChatBoxComponent,
    StartComponent,
    FinancialComponent,
    QuotationsComponent,
    InvoicesComponent,
    ShoppingComponent,
    CashAndBankComponent,
    RelationShipsComponent,
    ArticlesComponent,
    LinkComponent,
    CallUsComponent,
    ChatWithUsComponent,
    CalanderDialogComponent,
    SuccessMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
