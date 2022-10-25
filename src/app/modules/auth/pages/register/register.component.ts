import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  unnecessary: any = [0]
  userList = this.authService.usersList
  alreadyExist = ""
  registerConfirm = ""
  RegisterForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  })

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  async register(): Promise<any> {

    await this.authService.postList()
    this.userList = await this.authService.login()
    const name = Object.values(this.userList) as any[]
    const user = name.find((user) => user.username === this.RegisterForm.value.username)

    if (user) {
      let timerId = setInterval(() => {
        this.alreadyExist = "AlreadyExist"
      }, 200)
      setTimeout(() => {
        clearInterval(timerId), this.alreadyExist = ""
      }, 3500)

      return;
    } else {
      let timerId = setInterval(() => this.registerConfirm = "confirm", 200)
      setTimeout(() => {
        clearInterval(timerId), this.registerConfirm = ""
      }, 3500)

      await this.authService.register(this.RegisterForm.value.username, this.RegisterForm.value.password, this.unnecessary, this.unnecessary)
    }
  }
}
