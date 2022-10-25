import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {SalesService} from "../../../sales/services/sales.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  username: any
  constructor(private authService: AuthService, private salesService: SalesService) { }

  async ngOnInit() {
    await this.salesService.getUserKey()
    this.username =  await this.salesService.getUsername()
  }


}
