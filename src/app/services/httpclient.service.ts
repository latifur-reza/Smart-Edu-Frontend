import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {
  baseUrl: string;
  constructor(public http: HttpClient) {
    this.baseUrl = environment.urls.api_base_url;
  }
  get<T>(url: string) {
    return this.http.get<T>(this.baseUrl + url, this.getHeaders());
  }
  find<T>(url: string) {
    return this.http.get<T>(this.baseUrl + url, this.getHeaders());
  }
  post(url: string, data: any) {
    //const payload = JSON.stringify(data);
    return this.http.post(this.baseUrl + url, data);
  }
  put(url: string, data: any) {
    //const payload = JSON.stringify(data);
    return this.http.put(this.baseUrl + url, data);
  }
  active(url: string) {
    //const payload = JSON.stringify(data);
    return this.http.put(this.baseUrl + url, null);
  }
  remove(url: string) {
    //const payload = JSON.stringify(data);
    return this.http.put(this.baseUrl + url, null);
  }
  delete(url: string) {
    return this.http.delete(this.baseUrl + url, this.getHeaders());
  }
  getHeaders(): any {
    const httpOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
        //"multipart/form-data"//'Authorization': 'bearer '""
      })
    };
    return httpOption;
  }
  getPostHeaders(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        //'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return httpOptions;
  }
}
