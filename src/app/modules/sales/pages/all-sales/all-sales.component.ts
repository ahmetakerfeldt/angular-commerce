import {Component, OnInit} from '@angular/core';
import {SalesService} from "../../services/sales.service";
import {HttpService} from "../../../../services/http.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.css']
})
export class AllSalesComponent implements OnInit {

  sameUser = false
  allSellingEmpty = false
  loading = true
  allSelling = []
  sellingItem: any = []


  constructor(private salesService: SalesService, private http: HttpService) {
  }

  async ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
    this.allSelling = await this.http.get("/allSelling.json")
    this.sellingItem = Object.values(this.allSelling)
    this.sellingItem.splice(0, 1)
    if (this.sellingItem.length == 0) {
      this.allSellingEmpty = true
    }
  }

  async buyItem(url: any, price: any, explanation: any) {
    Swal.fire({
      color: 'white',
      background: 'rgb(25 ,25 ,25)',
      title: 'Are you sure?',
      text: "You will buy this, do you approve?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, buy it.'
    }).then(async ( result) => {
      if (result.isConfirmed) {
        const activeUserKey = await this.salesService.getUserKey()
        const saleUserKey =  await this.salesService.sameItem(url, price, explanation)

        if (activeUserKey == saleUserKey) {
          let timerId = setInterval(() => this.sameUser = true, 200)
          setTimeout(() => {
            clearInterval(timerId), this.sameUser = false
          }, 3500)
        }else {
          await this.salesService.activeUserBuys(url, price, explanation)
          await this.salesService.deleteItemForAll(url, price, explanation)
          await this.salesService.deleteItemForUser(url, price, explanation)
        }
      }
    })
  }
}
