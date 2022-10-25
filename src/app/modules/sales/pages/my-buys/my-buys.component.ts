import { Component, OnInit } from '@angular/core';
import {SalesService} from "../../services/sales.service";

@Component({
  selector: 'app-my-buys',
  templateUrl: './my-buys.component.html',
  styleUrls: ['./my-buys.component.css']
})
export class MyBuysComponent implements OnInit {

  emptyBuys = false
  activeUserBuys: any = []
  userBuys: any = []
  constructor(private salesService: SalesService) { }

  async ngOnInit() {
   this.activeUserBuys = await this.salesService.listOfBuys()
    const userSales = await this.salesService.getUserSales()
    if (userSales.length == 1) {
      this.emptyBuys = true
    }
  }
}
