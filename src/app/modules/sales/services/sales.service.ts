import {Injectable} from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {AuthService} from "../../auth/services/auth.service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class SalesService {
  userArray: any = []
  userSellKeys: any
  userSellValues: any
  key: any
  activeUserKey: any = []
  activeUserBuy: any = []

  constructor(private http: HttpService, private authService: AuthService, private router: Router) {
  }

  delete() {
    return this.http.delete("/activeUser.json")
  }

  async postAll(url: any, price: any, explanation: any) {
    return this.http.post("/allSelling.json", {url: url, price: price, explanation: explanation})
  }

  async postItem(url: any, price: any, explanation: any) {
    this.activeUserKey = await this.http.get("/activeUser.json")
    const values: any = Object.values(this.activeUserKey)

    const obj = Object.entries(values[0])
    const realKey = obj[0]
    const key = realKey[1]

    return this.http.post(`/users/${key}/sell.json/`, {url: url, price: price, explanation: explanation})
  }

  async getView() {
    this.activeUserKey = await this.http.get("/activeUser.json")
    const values: any = Object.values(this.activeUserKey)

    const obj = Object.entries(values[0])
    const realKey = obj[0]
    this.key = realKey[1]

    const userSell = await this.http.get(`/users/${this.key}/sell.json`)

    return Object.values(userSell)
  }

  async getUserKey() {
    const getKey = await this.authService.getKey()
    const value: any = Object.values(getKey)
    const toArray = Object.entries(value[0])
    const realKey = toArray[0]
    this.key = realKey[1]
    return this.key
  }

  async getUsername() {
    const userName: any = await this.http.get(`/users/${this.key}.json`)
    return userName.username
  }

  async deleteUserSell(url: any, price: any, explanation: any) {
    const userSelling = await this.http.get(`/users/${this.key}/sell.json`)
    const userValues = Object.values(userSelling) as any[]
    const keys = Object.keys(userSelling)

    const itemIndex = userValues.findIndex((user: any) => user.url === url && user.price === price && user.explanation === explanation)
    const deleteItem = keys[itemIndex]
    return this.http.delete(`/users/${this.key}/sell/${deleteItem}.json`)
  }

  async mySales(url: any, price: any, explanation: any) {
    const userSelling = await this.http.get(`/allSelling.json`)
    const userValue = Object.values(userSelling) as any[]
    const keys = Object.keys(userSelling)

    const itemIndex = userValue.findIndex((user: any) => user.url === url && user.price === price && user.explanation === explanation)
    const deleteItem = keys[itemIndex]
    return this.http.delete(`/allSelling/${deleteItem}.json`)
  }

  async patchItem(body: any) {
    return this.http.patch(`/users/${this.key}.json`, {username: body})
  }

  async patchPassword(body: any) {
    return this.http.patch(`/users/${this.key}.json`, {password: body})
  }

  async getPassword() {
    const password: any = await this.http.get(`/users/${this.key}.json`)
    return password.password
  }

  async deleteAccount() {
    const userKey = await this.getUserKey()
    this.activeUserKey = await this.http.get("/activeUser.json")
    const allSales: any = await this.http.get('/allSelling.json')
    const allSellingKeys: any = Object.keys(allSales)
    const allSellingValues: any = Object.values(allSales)

    const values: any = Object.values(this.activeUserKey)

    const obj = Object.entries(values[0])
    const realKey = obj[0]
    this.key = realKey[1]

    const userSell = await this.http.get(`/users/${this.key}/sell.json`)
    const userSellValues: any = Object.values(userSell)

    if (userSell.length == 1) {
      await this.http.delete(`/users/${userKey}.json`)
      await this.http.delete('/activeUser.json')
      await this.router.navigate(['/login'])

    } else {
      for (let i = 1; i < allSellingValues.length; i++) {
        for (let j = 1; j < userSellValues.length; j++) {

          if (allSellingValues[i].explanation === userSellValues[j].explanation &&
            allSellingValues[i].price === userSellValues[j].price &&
            allSellingValues[i].url === userSellValues[j].url) {
            const popAllSelling = allSellingValues[i]
            const popUserSelling = userSellValues[j]

            const findIndexAllSelling = allSellingValues.findIndex((user: any) => user.url == popAllSelling.url &&
              user.price == popAllSelling.price &&
              user.explanation == popAllSelling.explanation);
            const key0 = allSellingKeys[findIndexAllSelling] //all selling key;

            await this.http.delete(`/allSelling/${key0}.json`)
            await this.http.delete(`/users/${userKey}.json`)
            await this.http.delete('/activeUser.json')
            await this.router.navigate(['/login'])
          }
        }
      }
    }
  }

  async post(reason: any, username: any) {
    await this.http.post('/reasons.json', {reason: reason, username: username})
  }

  async activeUserBuys(url: any, price: any, explanation: any) {
    const key = await this.getUserKey()
    return this.http.post(`/users/${key}/buy.json`, {url: url, price: price, explanation: explanation})
  }

  async getActiveUserBuys() {
    const key = await this.getUserKey()
    this.activeUserBuy = await this.http.get(`/users/${key}/buy.json`)
    return this.activeUserBuy
  }

  async listOfBuys() {
    const userBuys = await this.getActiveUserBuys()
    const values = Object.values(userBuys)
    values.splice(0, 1)
    return values
  }

  async deleteItemForAll(url: any, price: any, explanation: any) {
    const allSelling = await this.http.get(`/allSelling.json`)
    const allSellingValues = Object.values(allSelling)
    const allSellingKeys = Object.keys(allSelling)

    const findIndex = allSellingValues.findIndex((index: any) => index.url == url &&
      index.price == price &&
      index.explanation == explanation
    )

    const key = allSellingKeys[findIndex]
    await this.http.delete(`/allSelling/${key}.json`)
    setTimeout(() => this.router.navigate(['/my-buys']), 1500)
  }

  async deleteItemForUser(url: any, price: any, explanation: any) {
    const users = await this.http.get('/users.json')
    const userValues: any = Object.values(users)
    const userKeys = Object.keys(users)

    let saleKey = null;
    let saleUserKey = null;

    for (let i = 1; i < userValues.length; i++) {
      const userSells = userValues[i]
      const userSellSell = userSells.sell
      this.userSellKeys = Object.keys(userSellSell)
      this.userSellValues = Object.values(userSellSell)

      const findIndex = this.userSellValues.findIndex((index: any) => index.url == url &&
        index.price == price &&
        index.explanation == explanation)

      if (findIndex !== -1) {
        saleKey = this.userSellKeys[findIndex]
        saleUserKey = userKeys[i]
      }
    }
    await this.http.delete(`/users/${saleUserKey}/sell/${saleKey}.json`)
  }

  async sameItem(url: any, price: any, explanation: any) {
    const users = await this.http.get('/users.json')
    const userValues: any = Object.values(users)
    const userKeys = Object.keys(users)

    let saleKey = null;
    let saleUserKey = null;

    for (let i = 1; i < userValues.length; i++) {
      const userSells = userValues[i]
      const userSellSell = userSells.sell
      this.userSellKeys = Object.keys(userSellSell)
      this.userSellValues = Object.values(userSellSell)

      const findIndex = this.userSellValues.findIndex((index: any) => index.url == url &&
        index.price == price &&
        index.explanation == explanation)

      if (findIndex !== -1) {
        saleKey = this.userSellKeys[findIndex]
        saleUserKey = userKeys[i]
      }
    }
    return saleUserKey
  }

  async getUserSales() {
    const userKey = await this.getUserKey()
    const userSell = await this.http.get(`/users/${userKey}/buy.json`)
    return userSell
  }

  async getAllUsername() {

    const userRequest = await this.http.get('/users.json')
    const userValues: any = Object.values(userRequest)

    for (let i = 1; i < userValues.length; i++) {
     this.userArray.push(userValues[i].username)
    }return this.userArray
  }
}
