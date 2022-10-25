import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SalesRoutingModule} from './sales-routing.module';
import {AllSalesComponent} from './pages/all-sales/all-sales.component';
import {SaleItemComponent} from './pages/sale-item/sale-item.component';
import {MySalesComponent} from './pages/my-sales/my-sales.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import { MyBuysComponent } from './pages/my-buys/my-buys.component';

@NgModule({
  declarations: [
    AllSalesComponent,
    SaleItemComponent,
    MySalesComponent,
    MyBuysComponent,
        ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class SalesModule {
}
