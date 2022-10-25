import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../modules/auth/services/auth.service";
import {SalesService} from "../../../../modules/sales/services/sales.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  date = Date.now()
  username: any
  constructor(private authService: AuthService, private salesService: SalesService, private router: Router) { }

  async ngOnInit() {
    await this.salesService.getUserKey()
    this.username = await this.salesService.getUsername()
  }

  logOut() {
    this.authService.delete()
    return this.router.navigate(['/login'])

  }
}
