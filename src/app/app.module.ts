import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {DefaultLayoutModule} from "./layouts/default-layout/default-layout.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";


@NgModule({
  declarations: [
    AppComponent,

  ],
    imports: [
        BrowserModule,
      DefaultLayoutModule,
        AppRoutingModule,
        HttpClientModule,
      ReactiveFormsModule,
      SweetAlert2Module.forRoot()
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
