import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest } from '../model/loginRequest';
import { LoginResponse as LoginResponse } from '../model/loginResponse';
import { server } from '../app-global';
import { RecoveryRequest } from '../model/recoveryRequest';
import { PasswordlessLoginModel } from '../model/passwordlessLoginModel';
import { Verify2Factor } from '../model/verify2Factor';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  
  url = server + 'login'; //TODO: na jednom mestu

  constructor(private _http: HttpClient, private route: Router) {}

  login(loginR: LoginRequest) {
    return this._http.post<any>(this.url, loginR);
  }

  verifyAuthCode(code: any) {
    const url = server + 'two-factor';
    const dto:Verify2Factor={
      code:code,
      userId:this.getCurrentUser().userID
    }
    return this._http.post<any>(url,dto);
  }

  getQrCode(userId:string){
    const url = server + 'two-factor/'+userId;
    return this._http.get<any>(url);
  }

  forggotPasswrod(username: string) {
    return this._http.get<any>(this.url + '/recovery/' + username);
  }

  resendVerification(username: string) {
    return this._http.get<any>(this.url + '/verify/' + username);
  }

  loginRecoverRequest(recoveryRequest: RecoveryRequest) {
    return this._http.post<any>(this.url + '/recovery', recoveryRequest);
  }
  loginPasswordless(token: PasswordlessLoginModel) {
    const url = server + 'magic-link-login';
    return this._http.post<any>(url, token);
  }

  sendMagicLinkMail(mail: string) {
    const url = server + 'magic-link-login/send-mail';
    return this._http.post<any>(url, { email: mail }).subscribe();
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
    if (user.role == 'ADMIN') {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('role', user.role);
      this.route.navigateByUrl('/admin/dashboard');
      return;
    }
    const headers = this.getHeaders();
    const url = server + 'profile/' + loginResponse.userID;
    this._http.get<any>(url, { headers: headers }).subscribe((data) => {
      user.fullName = data.profile.name + ' ' + data.profile.surname;
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('role', user.role);
      if (user.role == 'USER') {
        user.twoFactor==true ? window.location.href = '/two-factor' : window.location.href='/'
      }
    });
  }

  logout() {
    var user = new LoginResponse();
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = '/';
  }

  getCurrentUser(): LoginResponse {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser != null) {
      return JSON.parse(localStorage.getItem('currentUser')!);
    } else {
      return new LoginResponse();
    }
  }

  isUserLoggedIn() {
    let user=this.getCurrentUser();
    if (user== null || user.token==undefined) {
      return false;
    } else {
      return this.getCurrentUser().role !== '';
    }
  }

  getHeaders() {
    if (this.isUserLoggedIn()) {
      const token = this.getCurrentUser().token;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + token,
      });
      return headers;
    } else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return headers;
    }
  }

  getCurrentUserRole() {
    return this.getCurrentUser().role;
  }
}
