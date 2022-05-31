import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/model/profileModel';
import { ChangePasswordRequest } from 'src/app/model/changePasswordRequest';
import { Skill } from 'src/app/model/skillModel';
import { DateSecondsFormat } from 'src/app/model/dateSecondsFormat';

@Component({
  selector: 'edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnInit {
  myProfile: Profile = new Profile();
  myProfileTemp: Profile = new Profile();

  changePasswordRequest: ChangePasswordRequest = new ChangePasswordRequest();

  constructor(
    private profileService: ProfileService,
    private loginService: LoginService
  ) {}

  changeProfileFormEditable: boolean = false;
  changeUsernameFormVisible: boolean = false;
  changeEmailFormVisible: boolean = false;
  changePasswordFormVisible: boolean = false;
  changeBiographyFormVisible: boolean = false;

  newUsername: string = '';
  newEmail: string = '';
  birthDate: string = '2000-01-01';
  biography: string = '';
  skills: string = '';
  interests: string = '';

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    let myId = this.loginService.getCurrentUser().userID;
    this.profileService.getUserById(myId).subscribe((data) => {
      this.profileService.modifyProfileData(data);
      this.myProfile = data.profile;
      this.myProfileTemp = this.myProfile; //reference oboje pokazuju na isto
      this.changePasswordRequest.username = this.myProfile.username;
      if (this.myProfile.birthDate != undefined) {
        this.birthDate = this.myProfile.birthDate?.toISOString().split('T')[0];
      }
      this.biography = this.myProfile.biography;
      this.skills = this.myProfile.skills
        .filter((e) => e.skillType == 'Skill')
        .map((e) => {
          return e.name;
        })
        .toString();
      this.interests = this.myProfile.skills
        .filter((e) => e.skillType != 'Skill')
        .map((e) => {
          return e.name;
        })
        .toString();
    });
  }

  startChangeProfile() {
    this.cancelAllOtherForms(1);
    this.myProfileTemp = JSON.parse(JSON.stringify(this.myProfile));
    this.changeProfileFormEditable = true;
  }

  cancelChangeProfile() {
    this.myProfile = this.myProfileTemp;
    this.changeProfileFormEditable = false;
    if (this.myProfile.birthDate != undefined) {
      this.birthDate = this.myProfile.birthDate?.toISOString().split('T')[0];
    }
  }

  startChangeUsername() {
    this.cancelAllOtherForms(2);
    this.changeUsernameFormVisible = true;
  }

  cancelChangeUsername() {
    this.changeUsernameFormVisible = false;
    this.newUsername = '';
  }

  startChangeEmail() {
    this.cancelAllOtherForms(3);
    this.changeEmailFormVisible = true;
  }

  cancelChangeEmail() {
    this.changeEmailFormVisible = false;
    this.newEmail = '';
  }

  startChangePassword() {
    this.cancelAllOtherForms(4);
    this.changePasswordFormVisible = true;
  }

  cancelChangePassword() {
    this.changePasswordFormVisible = false;
    this.changePasswordRequest = new ChangePasswordRequest();
    this.changePasswordRequest.username = this.myProfile.username;
  }

  startChangeBiography() {
    this.cancelAllOtherForms(5);
    this.changeBiographyFormVisible = true;
  }

  cancelChangeBiography() {
    this.changeBiographyFormVisible = false;
    this.biography = this.myProfile.biography;
    this.skills = this.myProfile.skills
      .filter((e) => e.skillType == 'Skill')
      .map((e) => {
        return e.name;
      })
      .toString();
    this.interests = this.myProfile.skills
      .filter((e) => e.skillType != 'Skill')
      .toString();
  }

  cancelAllOtherForms(n: number) {
    if (n != 1) this.cancelChangeProfile();
    if (n != 2) this.cancelChangeUsername();
    if (n != 3) this.cancelChangeEmail();
    if (n != 4) this.cancelChangePassword();
    if (n != 5) this.cancelChangeBiography();
  }

  changeProfile() {
    let requestBody: any;
    requestBody = this.myProfile;
    requestBody.birthDate = new DateSecondsFormat();
    requestBody.birthDate.seconds = Date.parse(this.birthDate) / 1000 + 45000;

    this.profileService.updateProfile(requestBody).subscribe((data) => {
      this.loadProfile();
      this.changeProfileFormEditable = false;
    });
  }

  changeUsername() {
    this.myProfile.username = this.newUsername;
    let requestBody: any;
    requestBody = this.myProfile;
    requestBody.birthDate = new DateSecondsFormat();
    requestBody.birthDate.seconds = Date.parse(this.birthDate) / 1000 + 45000;

    this.profileService.updateProfile(requestBody).subscribe((data) => {
      this.loadProfile();
      this.cancelChangeUsername();
    });
  }

  changeEmail() {
    this.myProfile.email = this.newEmail;
    let requestBody: any;
    requestBody = this.myProfile;
    requestBody.birthDate = new DateSecondsFormat();
    requestBody.birthDate.seconds = Date.parse(this.birthDate) / 1000 + 45000;

    this.profileService.updateProfile(requestBody).subscribe((data) => {
      this.loadProfile();
      this.cancelChangeEmail();
    });
  }

  changePassword() {
    if (!this.changePasswordRequest.validateProperty()) {
      alert('All fields must be valid!');
      return;
    }
    this.profileService.changePassword(this.changePasswordRequest).subscribe(
      (data) => {
        if (data != null) {
          alert(data.msg);
          if (data.status == 200) this.cancelChangePassword();
        } else {
          alert('error?');
        }
      },
      (error) => {
        alert('ERROR');
      }
    );
  }

  changeBiography() {
    this.myProfile.biography = this.biography;
    this.myProfile.skills = [];
    for (let skill of this.skills.split(',').map((e) => e.trim())) {
      let newSkill = new Skill();
      newSkill.name = skill;
      newSkill.skillType = 'Skill';
      this.myProfile.skills.push(newSkill);
    }
    for (let interest of this.interests.split(',').map((e) => e.trim())) {
      let newInterest = new Skill();
      newInterest.name = interest;
      newInterest.skillType = 'Interest';
      this.myProfile.skills.push(newInterest);
    }

    let requestBody: any;
    requestBody = this.myProfile;
    requestBody.birthDate = new DateSecondsFormat();
    requestBody.birthDate.seconds = Date.parse(this.birthDate) / 1000 + 45000;

    this.profileService.updateProfile(requestBody).subscribe((data) => {
      this.loadProfile();
      this.cancelChangeBiography();
    });
  }

  generateApiKey() {
    this.profileService.generateApiKey().subscribe(
      (data) => {
        alert('Your Dislinkt API key:' + data.tokenCode);
      },
      (error) => {
        alert('Unable to generate api token');
      }
    );
  }
}
