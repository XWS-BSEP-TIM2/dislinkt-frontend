import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  url = 'http://localhost:9000/' + 'api/connection/recommendation'; //TODO: na jednom mestu

  constructor(private _http: HttpClient, private route: Router, private loginService: LoginService) { }

  GetRecommendations() {
    const headers = this.loginService.getHeaders();
    return this._http.get<any>(this.url, { headers: headers });
  }
}
