import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  public get(url: string, query?: any): Promise<any> {
    return this.http.get(`${environment.apiUrl}${url}`, {...query}).toPromise()
  }

  public post(url: string, body: any): Promise<any> {
    return this.http.post(`${environment.apiUrl}${url}`, {...body}).toPromise()
  }

  public delete(url: string, query?: any): Promise<any> {
    return this.http.delete(`${environment.apiUrl}${url}`, {params: {...query}}).toPromise()
  }

  public patch(url: string, body: any, query?: any):Promise<any> {
    return this.http.patch(`${environment.apiUrl}${url}`, {...body}, {params: {...query}}).toPromise()
  }
}
