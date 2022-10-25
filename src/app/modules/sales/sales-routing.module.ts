import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllSalesComponent} from "./pages/all-sales/all-sales.component";
import {SaleItemComponent} from "./pages/sale-item/sale-item.component";
import {MySalesComponent} from "./pages/my-sales/my-sales.component";
import {MyBuysComponent} from "./pages/my-buys/my-buys.component";

const routes: Routes = [
  {
    path: "all-sales",
    component: AllSalesComponent
  },
  {
    path: "sale-item",
    component: SaleItemComponent
  },
  {
    path: "my-sales",
    component: MySalesComponent
  },
  {
    path: "my-buys",
    component: MyBuysComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {
}
