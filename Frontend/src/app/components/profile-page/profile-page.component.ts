import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Experience } from 'src/app/model/experienceModel';
import { LoginRespons } from 'src/app/model/loginResponse';
import { Profile } from 'src/app/model/profileModel';
import { ConnectionService } from 'src/app/services/connection.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  userProfile: Profile = new Profile();
  userPosition: Experience = new Experience();
  connectionNumber: number = 0;
  loginResponse!: LoginRespons;
  targetUserID: string = '';

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    this.targetUserID = this.route.snapshot.paramMap.get('id')!;
    this.loginResponse = this.loginService.getCurrentUser();
    this.myProfileFunc();

    this.profileService.getUserById(this.targetUserID).subscribe((data) => {
      this.userProfile = data.profile;
      this.userPosition = this.profileService.getCurrentPosition(
        this.userProfile
      );
      console.log(this.userPosition);
    });

    this.connectionService.GetFriends(this.targetUserID).subscribe((data) => {
      this.connectionNumber = data.length;
    });
  }

  myProfileFunc(): boolean {
    let urlID = window.location.pathname.substring(6).split('/')[0];
    //return this.loginService.getCurrentUser().userID === urlID;   //TODO: fix
    //TODO: linija iznad uporedjuje prijavljenog korisnika i id prosledjenog
    return urlID === this.loginResponse.userID;
  }

  redirectConnections() {
    window.location.href =
      'user/' +
      window.location.pathname.substring(6).split('/')[0] +
      '/connections';
  }
}
