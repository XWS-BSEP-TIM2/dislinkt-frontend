import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Experience } from 'src/app/model/experienceModel';
import { LoginResponse } from 'src/app/model/loginResponse';
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
  loginResponse!: LoginResponse;
  targetUserID: string = '';

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    this.userProfile.id = this.route.snapshot.paramMap.get('id')!;
    this.targetUserID = this.userProfile.id;
    this.loginResponse = this.loginService.getCurrentUser();
    this.myProfileFunc();

    this.profileService.getUserById(this.userProfile.id).subscribe((data) => {
      this.userProfile = data.profile;
      this.userPosition = this.profileService.getCurrentPosition(
        this.userProfile
      );
      //console.log(this.userPosition);
    });

    this.connectionService.GetFriends(this.userProfile.id).subscribe((data) => {
      this.connectionNumber = data.length;
    });
  }

  myProfileFunc(): boolean {
    let urlID = this.userProfile.id;
    //return this.loginService.getCurrentUser().userID === urlID;   //TODO: fix
    //TODO: linija iznad uporedjuje prijavljenog korisnika i id prosledjenog
    return urlID === this.loginResponse.userID;
  }

  redirectConnections() {
    window.location.href = 'user/' + this.userProfile.id + '/connections';
  }

  redirectBlocks() {
    window.location.href = 'user/' + this.userProfile.id + '/blocks';
  }

  redirectRequests() {
    window.location.href = 'user/' + this.userProfile.id + '/requests';
  }

  redirectFeed() {
    window.location.href = 'user/' + this.userProfile.id;
  }
}
