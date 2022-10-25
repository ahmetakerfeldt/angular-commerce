import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultLayoutComponent} from "./layouts/default-layout/default-layout.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./modules/auth/auth.module").then((module) => module.AuthModule)
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("./modules/sales/sales.module").then((module) => module.SalesModule)
      },
      {
        path: "user",
        loadChildren: () => import("./modules/user/user.module").then((module) => module.UserModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
