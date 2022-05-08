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
  private user = new LoginResponse();

  constructor(private _http: HttpClient, private route: Router) {}

  login(loginR: LoginRequest) {
    return this._http.post<any>(this.url, loginR);
  }

  loginSetUser(loginResponse: LoginResponse) {
    //console.log(this.user);
    localStorage.setItem('currentUser', JSON.stringify(loginResponse));
    this.writeFullNameToStorage(loginResponse);
    window.location.href = '/';
  }

  writeFullNameToStorage(loginResponse: LoginResponse) {
    //TODO: run this command after changing users' names in settings as well!
    var user = loginResponse;
    const headers = this.getHeaders();
    const url = 'http://localhost:9000/user/' + loginResponse.userID;
    this._http.get<any>(url, { headers: headers }).subscribe((data) => {
      this.user.fullName = data.profile.name + ' ' + data.profile.surname;
      localStorage.setItem('currentUser', JSON.stringify(loginResponse));
    });
  }

  logout() {
    this.user = new LoginResponse();
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    window.location.href = '/';
  }

  getCurrentUser(): LoginResponse {
    return JSON.parse(localStorage.getItem('currentUser')!);
  }

  isUserLoggedIn() {
    return this.getCurrentUser().role !== '';
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
