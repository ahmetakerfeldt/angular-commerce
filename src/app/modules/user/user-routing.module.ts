import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserSettingsComponent} from "./pages/user-settings/user-settings.component";
import {ChangeUsernameComponent} from "./components/change-username/change-username.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import {DeleteUserComponent} from "./components/delete-user/delete-user.component";

const routes: Routes = [
  {
    path: 'settings',
    component: UserSettingsComponent,
  },
  {
    path: 'change-username',
    component: ChangeUsernameComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'delete-account',
    component: DeleteUserComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
