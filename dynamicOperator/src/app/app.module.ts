import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { viewContainerRefDirective } from './viewContainer';
import { MaterialModule } from './material/material.module';
import { GetCustomerChatComponent } from './get-customer-chat/get-customer-chat.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ShowChatComponent } from './show-chat/show-chat.component';
import { NewCustomerChatComponent } from './new-customer-chat/new-customer-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    NewCustomerComponent,
    viewContainerRefDirective,
    GetCustomerChatComponent,
    HeaderComponent,
    HomePageComponent,
    ShowChatComponent,
    NewCustomerChatComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
