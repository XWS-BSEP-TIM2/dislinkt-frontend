import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest } from '../model/loginRequest';
import { LoginRespons as LoginResponse } from '../model/loginResponse';

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
    this.user = loginResponse;
    //console.log(this.user);
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    window.location.href = '/';
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
