import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default-layout.component';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {RouterModule} from "@angular/router";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";



@NgModule({
  declarations: [
    DefaultLayoutComponent,
    NavbarComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        SweetAlert2Module
    ]
})
export class DefaultLayoutModule { }
