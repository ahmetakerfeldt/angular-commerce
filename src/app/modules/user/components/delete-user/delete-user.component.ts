import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {SalesService} from "../../../sales/services/sales.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  notTruePassword = false
  inputForm = this.fb.group({
    reason: ['', Validators.required],
    password: ['', Validators.required],
    confirms: ['', [Validators.required, Validators.pattern('^CONFIRM$')]]
  })
  constructor(private fb: FormBuilder, private salesService: SalesService) { }

  ngOnInit(): void {
  }


  async deleteAccount() {

    Swal.fire({

      title: 'Are you sure?',
      color: 'white',
      background: 'rgb(25 ,25 ,25)',
      text: "Your account will be deleted, do you confirm? (You will be redirected to the login page.)",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Delete My Account',
      cancelButtonText: 'Back',
      reverseButtons: true
    }).then(async (result) => {

      if (result.isConfirmed) {
        const  password: any = await this.salesService.getPassword()

        if(password == this.inputForm.value.password) {
          this.notTruePassword = false
          const username = await this.salesService.getUsername()
          await this.salesService.post(this.inputForm.value.reason, username)
          return  this.salesService.deleteAccount()


        }else {
          this.notTruePassword = true
        }
      }
    })
  }
}
