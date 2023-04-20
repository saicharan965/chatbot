import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './Side-Nav-Components/articles/articles.component';
import { CashAndBankComponent } from './Side-Nav-Components/cash-and-bank/cash-and-bank.component';
import { FinancialComponent } from './Side-Nav-Components/financial/financial.component';
import { InvoicesComponent } from './Side-Nav-Components/invoices/invoices.component';
import { LinkComponent } from './Side-Nav-Components/link/link.component';
import { QuotationsComponent } from './Side-Nav-Components/quotations/quotations.component';
import { RelationShipsComponent } from './Side-Nav-Components/relation-ships/relation-ships.component';
import { ShoppingComponent } from './Side-Nav-Components/shopping/shopping.component';
import { StartComponent } from './Side-Nav-Components/start/start.component';

const routes: Routes = [
  {path:"", component: StartComponent},
  {path: "financial", component: FinancialComponent},
  {path: "quotations", component: QuotationsComponent},
  {path: "invoices", component:InvoicesComponent},
  {path: "shopping", component:ShoppingComponent},
  {path: "cashandbank", component:CashAndBankComponent},
  {path: "relationships", component:RelationShipsComponent},
  {path: "articles", component:ArticlesComponent},
  {path: "links", component:LinkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
