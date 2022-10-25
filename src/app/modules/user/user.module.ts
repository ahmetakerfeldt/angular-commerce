import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserSettingsComponent} from './pages/user-settings/user-settings.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangeUsernameComponent } from './components/change-username/change-username.component';


@NgModule({
  declarations: [
    UserSettingsComponent,
    DeleteUserComponent,
    ChangePasswordComponent,
    ChangeUsernameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule {
}
