import { Injectable } from '@angular/core';
import {HttpService} from "../../../services/http.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  unnecessary:any = [0]
  usersList = []
  constructor(private http: HttpService) { }

  register(username: any, password: any, sell: any, buy: any) {
    return this.http.post('/users.json', {username, password, sell, buy})
  }

  login() {
    return this.http.get('/users.json')
  }

  postKey(userKey: any) {
    return this.http.post('/activeUser.json', {userKey})
  }

  getKey() {
    return this.http.get('/activeUser.json')
  }
  delete() {
    return this.http.delete("/activeUser.json")
  }

  async postList() {
    const users = await this.http.get('/users.json')
    if (!users) {
      return this.http.post('/users.json', {0: 1})
    }
    const allSelling = await this.http.get('/allSelling.json')
    if (!allSelling) {
      return this.http.post('/allSelling.json', {0:1})
    }
  }
}
