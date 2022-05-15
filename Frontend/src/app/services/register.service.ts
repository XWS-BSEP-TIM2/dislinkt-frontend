import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationModel } from '../model/registrationModel'
import { server } from '../app-global';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = server+'api/' + 'register'; //TODO: 

  constructor(private _http: HttpClient) { }

  register(user: RegistrationModel) {
    return this._http.post<any>(this.url, user);
  }

}
