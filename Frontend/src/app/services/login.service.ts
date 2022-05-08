import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest } from '../model/loginRequest';
import { LoginResponse as LoginResponse } from '../model/loginResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://localhost:9000/login'; //TODO: na jednom mestu

  constructor(private _http: HttpClient, private route: Router) {}

  login(loginR: LoginRequest) {
    return this._http.post<any>(this.url, loginR);
  }

  loginSetUser(loginResponse: LoginResponse) {
    localStorage.setItem('currentUser', JSON.stringify(loginResponse));
    this.writeFullNameToStorage(loginResponse);
    window.location.href = '/';
  }

  writeFullNameToStorage(loginResponse: LoginResponse) {
    //TODO: run this command after changing users' names in settings as well!
    var user = loginResponse;
    const headers = this.getHeaders();
    const url = 'http://localhost:9000/profile/' + loginResponse.userID;
    this._http.get<any>(url, { headers: headers }).subscribe((data) => {
      user.fullName = data.profile.name + ' ' + data.profile.surname;
      console.log();
      localStorage.setItem('currentUser', JSON.stringify(user));
    });
  }

  logout() {
    var user = new LoginResponse();
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = '/';
  }

  getCurrentUser(): LoginResponse {
    return JSON.parse(localStorage.getItem('currentUser')!);
  }

  isUserLoggedIn() {
    if (this.getCurrentUser() == null) {
      return false;
    } else {
      return this.getCurrentUser().role !== '';
    }
  }

  getHeaders() {
    const token = this.getCurrentUser().token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + token,
    });
    return headers;
  }
}
