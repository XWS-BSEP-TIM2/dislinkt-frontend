import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profileModel';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
})
export class ProfilePictureComponent implements OnInit {
  @Input() user: Profile = new Profile();
  @Input() size: number = 50;
  @Input() activeUser: boolean = false;
  fullName: string = 'Null';

  constructor(
    private profileService: ProfileService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    if (this.activeUser) {
      this.fullName = this.loginService.getCurrentUser().fullName;
    } else {
      this.fullName = this.profileService.getFullName(this.user);
    }
  }
}
