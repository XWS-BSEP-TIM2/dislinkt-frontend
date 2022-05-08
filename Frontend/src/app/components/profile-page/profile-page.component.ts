import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionPanelModel } from 'src/app/model/connectionPanelModel';
import { LoginRespons } from 'src/app/model/loginResponse';
import { ConnectionService } from 'src/app/services/connection.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {

  loginRespons!: LoginRespons;
  targetUserID: string = '';

  constructor(private loginService: LoginService) {
  }

  myProfileFunc(): boolean {
    let urlID = this.getTargetUserID()
    //return this.loginService.getCurrentUser().userID === urlID;   //TODO: fix
    //TODO: linija iznad uporedjuje prijavljenog korisnika i id prosledjenog
    return urlID === this.loginRespons.userID
  }

  ngOnInit(): void {
    this.targetUserID = this.getTargetUserID()
    this.loginRespons = this.loginService.getCurrentUser()
    this.myProfileFunc()
  }

  redirectConnections() {
    window.location.href = 'user/'+this.getTargetUserID()+'/connections';
  }

  redirectBlocks() {
    window.location.href = 'user/'+this.getTargetUserID()+'/blocks';
  }

  redirectRequests() {
    window.location.href = 'user/'+this.getTargetUserID()+'/requests';
  }

  getTargetUserID(): string{
    return window.location.pathname.substring(6).split('/')[0]
  }
}
