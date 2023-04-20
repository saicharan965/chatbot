import { NewCustomerChatComponent } from './new-customer-chat/new-customer-chat.component';
import { ShowChatComponent } from './show-chat/show-chat.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetCustomerChatComponent } from './get-customer-chat/get-customer-chat.component';

const routes: Routes = [
  {path:"", component: HomePageComponent},
  {path:"chatHistory", component: GetCustomerChatComponent},
  {path:"chatHistory/:id", component: NewCustomerChatComponent},
  {path:"showChat", component: ShowChatComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
