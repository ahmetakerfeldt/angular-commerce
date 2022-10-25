import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {SalesService} from "../../../sales/services/sales.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  misMatch = false
  notTruePassword = false
  inputForm = this.fb.group({
    lastPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    newPasswordAgain: ['', Validators.required],
    confirms: ['', [Validators.required, Validators.pattern("^CONFIRM$")]]
  })

  constructor(private fb: FormBuilder, private salesService: SalesService, private router: Router) {
  }

  ngOnInit(): void {
  }

  async changePassword() {
    Swal.fire({
      color: 'white',
      background: 'rgb(25 ,25 ,25)',
      title: 'Are you sure?',
      text: "Are you sure you want to change your password?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'green',
      confirmButtonText: 'Yes, change password',
      cancelButtonText: 'Back',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const password = await this.salesService.getPassword()
        if (password == this.inputForm.value.lastPassword) {
          if (this.inputForm.value.newPassword == this.inputForm.value.newPasswordAgain) {
            await this.salesService.patchPassword(this.inputForm.value.newPassword)
            await this.router.navigate(['/user/settings'])
          }else {
            let timerId = setInterval(() => this.misMatch = true, 200)
            setTimeout(() => {
              clearInterval(timerId), this.misMatch = false
            }, 3500)
          }
        }else {
          let timerId = setInterval(() => this.notTruePassword = true, 200)
          setTimeout(() => {
            clearInterval(timerId), this.notTruePassword = false
          }, 3500)
          if (this.inputForm.value.newPassword != this.inputForm.value.newPasswordAgain) {
            let timerId = setInterval(() => this.misMatch = true, 200)
            setTimeout(() => {
              clearInterval(timerId), this.misMatch = false
            }, 3500)
          }
        }
      }
    })
  }
}
