import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { server } from '../app-global';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url = server + 'messages'; 

  constructor(private _http: HttpClient, private loginService: LoginService) { }

  getMyContacts() {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/contacts';
    return this._http.get<any>(url, { headers: headers });
  }


}
