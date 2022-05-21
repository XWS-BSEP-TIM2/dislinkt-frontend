import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest } from '../model/loginRequest';
import { LoginResponse as LoginResponse } from '../model/loginResponse';
import { server } from '../app-global';
import { RecoveryRequest } from '../model/recoveryRequest';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = server+'login'; //TODO: na jednom mestu

  constructor(private _http: HttpClient, private route: Router) {}

  login(loginR: LoginRequest) {
    return this._http.post<any>(this.url, loginR);
  }

  forggotPasswrod(username: string) {
    return this._http.get<any>(this.url+'/recovery/'+username);
  }

  resendVerification(username: string) {
    return this._http.get<any>(this.url + '/verify/' + username);
  }

  loginRecoverRequest(recoveryRequest: RecoveryRequest) {
    return this._http.post<any>(this.url+'/recovery', recoveryRequest);
  }

  loginSetUser(loginResponse: LoginResponse) {
    loginResponse.fullName = '';
    localStorage.setItem('currentUser', JSON.stringify(loginResponse));
    this.writeFullNameToStorage(loginResponse);
    // window.location.href = '/';
  }

  writeFullNameToStorage(loginResponse: LoginResponse) {
    //TODO: run this command after changing users' names in settings as well!
    var user = loginResponse;
    const headers = this.getHeaders();
    const url = server+'profile/' + loginResponse.userID;
    this._http.get<any>(url, { headers: headers }).subscribe((data) => {
      user.fullName = data.profile.name + ' ' + data.profile.surname;
      console.log();
      localStorage.setItem('currentUser', JSON.stringify(user));
      window.location.href = '/';
    });
  }

  logout() {
    var user = new LoginResponse();
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = '/';
  }

  getCurrentUser(): LoginResponse {
    let currentUser = localStorage.getItem('currentUser')
    if (currentUser != null) {
      return JSON.parse(localStorage.getItem('currentUser')!);  
    } else {
      return new LoginResponse();  
    }
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
