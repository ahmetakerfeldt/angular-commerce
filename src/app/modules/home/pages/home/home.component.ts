import { Component, OnInit } from '@angular/core';
import {SalesService} from "../../../sales/services/sales.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private salesService: SalesService) { }

  async ngOnInit() {
    await this.salesService.getUserKey()
    await this.salesService.getUsername()
  }

}
