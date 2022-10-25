import {Component, OnInit} from '@angular/core';
import {SalesService} from "../../services/sales.service";
import Swal from "sweetalert2"


@Component({
  selector: 'app-my-sales',
  templateUrl: './my-sales.component.html',
  styleUrls: ['./my-sales.component.css']
})
export class MySalesComponent implements OnInit {
  loading = true;
  userSellValues: any[] = []

  constructor(private salesService: SalesService,) {
  }

  async ngOnInit() {
    await this.getUserSales();
    this.userSellValues.splice(0, 1)
  }

  getUserSales() {
    return this.salesService.getView().then((userSells) => {
      this.userSellValues = userSells;
    }).finally(() => {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    })
  }

   deleteUserSell(url: any, price: any, explanation: any) {
    Swal.fire({
      color: 'white',
      background: 'rgb(25 ,25 ,25)',
      title: 'Are you sure?',
      text: "",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'darkred',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Back',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.loading = true;
        try {
          await this.salesService.deleteUserSell(url, price, explanation);
          await this.salesService.mySales(url, price, explanation)
          await this.getUserSales();
          this.userSellValues.splice(0, 1)
        } catch {
          this.loading = false;
        }
      }
    })
  }
}
