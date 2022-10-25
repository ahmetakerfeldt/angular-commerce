import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  async info() {
   await Swal.fire({
      color: 'white',
      background: 'rgb(29, 29, 29)',
      text: 'Google Firebase Realtime Database is used in this application.' +
        ' Since I\'m using it in the trial version,' +
        ' it is necessary to change the Database URL after a while' +
        '. You can change apiUrl from environment.ts file.',

    })
  }
}
