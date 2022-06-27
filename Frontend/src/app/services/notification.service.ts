import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../app-global';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  url = server + 'notifications';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  getNotifications() {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/' + this.loginService.getCurrentUser().userID;
    return this._http.get<any>(url, {
      headers: headers,
    });
  }

  readNotifications() {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/' + this.loginService.getCurrentUser().userID;
    return this._http.put<any>(url, null, {
      headers: headers,
    });
  }

  getNotificationSettings() {
    const headers = this.loginService.getHeaders();
    const url =
      this.url + '/settings/' + this.loginService.getCurrentUser().userID;
    return this._http.get<any>(url, {
      headers: headers,
    });
  }

  updateNotificationSettings(code: string) {
    const headers = this.loginService.getHeaders();
    const url =
      this.url +
      '/settings/' +
      this.loginService.getCurrentUser().userID +
      '/' +
      code;
    return this._http.put<any>(url, null, {
      headers: headers,
    });
  }
}
