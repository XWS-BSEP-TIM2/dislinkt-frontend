import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationModel } from '../model/registration-model'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = 'http://localhost:9000/api/' + 'register'; //TODO: 

  constructor(private _http: HttpClient) { }

  register(user: RegistrationModel) {
    return this._http.post<any>(this.url, user);
  }

}
