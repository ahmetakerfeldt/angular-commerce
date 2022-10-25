import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {SalesService} from "../../services/sales.service";
import {AuthService} from "../../../auth/services/auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sale-item',
  templateUrl: './sale-item.component.html',
  styleUrls: ['./sale-item.component.css']
})
export class SaleItemComponent implements OnInit {

  inputForm = this.fb.group({
    url: ["", Validators.required],
    price: ["", Validators.required],
    explanation: ["", Validators.required],
  })
  constructor(private fb: FormBuilder, private salesService: SalesService, private router: Router) { }

  ngOnInit(): void {
  }

  async Sell(){
    Swal.fire({
      position: 'center',
      color: 'white',
      background: 'rgb(25 ,25 ,25)',
      icon: 'success',
      title: 'Your ad has been published!',
      showConfirmButton: false,
      timer: 1500
    })
    await this.salesService.getUserKey()
    const seller = await this.salesService.getUsername()
    await this.salesService.postAll(this.inputForm.value.url, this.inputForm.value.price, this.inputForm.value.explanation)
    await this.salesService.postItem(this.inputForm.value.url, this.inputForm.value.price, this.inputForm.value.explanation);
    return this.router.navigate(['/my-sales'])
  }
}
