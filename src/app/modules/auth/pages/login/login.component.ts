import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SalesService} from "../../../sales/services/sales.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  eyesOpen = false
  eyesClose = true

  activeUserKey: any = this.salesService.activeUserKey
  loginGroup = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  })
  list = this.authService.usersList
  notFound = ""

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private salesService: SalesService) {
  }

  ngOnInit(): void {
  }

  async loginControl(): Promise<any> {

    await this.authService.postList()
    this.list = await this.authService.login()
    const values = Object.values(this.list) as any[]

    const activeUserFinder = Object.keys(this.list)
    const userIndex = values.findIndex((user) => user.username ===
      this.loginGroup.value.username &&
      user.password === this.loginGroup.value.password)

    if (userIndex == -1) {
      const timerId = setTimeout(() =>
        this.notFound = "notFound", 400)
      setInterval(() => {
        clearTimeout(timerId), this.notFound = ""
      }, 3500)
      return;
    }
    this.activeUserKey = activeUserFinder[userIndex];
    await this.authService.postKey(this.activeUserKey)
    return this.router.navigate(['/all-sales'])
  }

  eyeOpen() {
    this.eyesOpen = false
    this.eyesClose = true
  }

  eyeClose() {
    this.eyesOpen = true
    this.eyesClose = false
  }
}
