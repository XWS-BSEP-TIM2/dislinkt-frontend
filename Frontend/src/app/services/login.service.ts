import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest } from '../model/loginRequest';
import { LoginRespons } from '../model/loginResponse';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost:9000/' + 'login'; //TODO: na jednom mestu
  private user = new LoginRespons();

  constructor(private _http: HttpClient, private route: Router) {}

  login(loginR: LoginRequest) {
    return this._http.post<any>(this.url, loginR);
  }

  loginSetUser(loginRespons: LoginRespons) {
    this.user = loginRespons;
    console.log(this.user);
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    window.location.href = '/';
  }

  logout() {
    this.user = new LoginRespons();
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    window.location.href = '/';
  }

  getCurrentUser(): LoginRespons {
    return JSON.parse(localStorage.getItem('currentUser')!);
  }

  isUserLoggedIn() {
    return this.getCurrentUser().role !== ''
  }

  getHeaders() {
    const token = this.getCurrentUser().token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ` + token,
    });
    return headers;
  }
}
