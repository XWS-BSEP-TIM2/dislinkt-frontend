import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { server } from '../app-global';
import { Message } from '../model/Message';
import { SendMessageRequest } from '../model/SendMessageRequest';


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

  getChat(msgID: string) {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/chat/'+msgID;
    return this._http.get<any>(url, { headers: headers });
  }

  sendMessage(sendMessageRequest: SendMessageRequest) {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/chat/send';
    return this._http.post<any>(url, sendMessageRequest, { headers: headers });
  }

  setSeen(setSeenReq: any) {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/chat/seen';
    return this._http.post<any>(url, setSeenReq, { headers: headers });
  }


}
