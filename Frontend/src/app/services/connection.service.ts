import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  url = 'http://localhost:9000/'; //TODO: na jednom mestu

  constructor(private _http: HttpClient, private route: Router, private loginService: LoginService) { }

  GetRecommendations() {
    const headers = this.loginService.getHeaders();
    return this._http.get<any>(this.url + 'api/connection/recommendation', { headers: headers });
  }

  GetFriends(userID: string) {
    const headers = this.loginService.getHeaders();
    return this._http.get<any>(this.url + 'api/connection/friends/'+userID, { headers: headers });
  }

  GetDetail(myUserID: string, targetUserID: string) {
    const headers = this.loginService.getHeaders();
    return this._http.get<any>(this.url + 'connection/'+myUserID+'/detail/'+targetUserID, { headers: headers });
  }

  AddFriend(myUserID: string, targetUserID: string) {
    const headers = this.loginService.getHeaders();
    return this._http.post<any>(this.url + 'connection/friend', {"userIDa": myUserID, "userIDb": targetUserID}, { headers: headers } );
  }

  RemoveFriend(myUserID: string, targetUserID: string) {
    const headers = this.loginService.getHeaders();
    return this._http.post<any>(this.url + 'connection/remove-friend', {"userIDa": myUserID, "userIDb": targetUserID}, { headers: headers } );
  }

  AddBlockUser(myUserID: string, targetUserID: string) {
    const headers = this.loginService.getHeaders();
    return this._http.post<any>(this.url + 'connection/block', {"userIDa": myUserID, "userIDb": targetUserID}, { headers: headers } );
  }

  UnblockUser(myUserID: string, targetUserID: string) {
    const headers = this.loginService.getHeaders();
    return this._http.post<any>(this.url + 'connection/unblock', {"userIDa": myUserID, "userIDb": targetUserID}, { headers: headers } );
  }

  SendFriendRequest(myUserID: string, targetUserID: string) {
    const headers = this.loginService.getHeaders();
    return this._http.post<any>(this.url + 'connection/friend-request', {"userIDa": myUserID, "userIDb": targetUserID}, { headers: headers } );
  }

  UnsendFriendRequest(myUserID: string, targetUserID: string) {
    const headers = this.loginService.getHeaders();
    return this._http.post<any>(this.url + 'connection/remove-friend-request', {"userIDa": myUserID, "userIDb": targetUserID}, { headers: headers } );
  }

 


}
