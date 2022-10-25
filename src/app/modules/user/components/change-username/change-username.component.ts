import {Component, OnInit} from '@angular/core';
import {SalesService} from "../../../sales/services/sales.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.css']
})
export class ChangeUsernameComponent implements OnInit {

  sameUsername = false
  usernameAlreadyExist = false
  username: any
  inputForm = this.fb.group({
    newUsername: ['', Validators.required],
    confirm: [
      '',
      [
        Validators.required,
        Validators.pattern("^CONFIRM$"),
      ]
    ],
  })

  constructor(private fb: FormBuilder, private salesService: SalesService, private router: Router) {
  }

  async ngOnInit() {
    await this.salesService.getUserKey()
    this.username = await this.salesService.getUsername()

  }

  async changeUsername() {
    const activeUsername = await this.salesService.getUsername()
    const users = await this.salesService.getAllUsername()

    for (let i = 0; i < users.length ;i++) {

      if(activeUsername === this.inputForm.value.newUsername) {
        let timerId = setInterval(() => this.sameUsername = true, 200)
        setTimeout(() => {
          clearInterval(timerId), this.sameUsername = false
        }, 3500)
        return
      }

      if (users[i] === this.inputForm.value.newUsername) {
        let timerId = setInterval(() => this.usernameAlreadyExist = true, 200)
        setTimeout(() => {
          clearInterval(timerId), this.usernameAlreadyExist = false
        }, 3500)
        return
      }
    }
    await Swal.fire({
      color: 'white',
      background: 'rgb(25 ,25 ,25)',
      position: 'center',
      icon: 'success',
      title: 'Your username has been successfully changed,You are being redirected...',
      showConfirmButton: false,
      timer: 2500
    })
    await this.salesService.patchItem(this.inputForm.value.newUsername)
    await this.salesService.delete()
    return  this.router.navigate(['/login'])
  }
}
