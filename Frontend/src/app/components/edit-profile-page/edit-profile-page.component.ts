import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/model/profileModel';
import { ChangePasswordRequest } from 'src/app/model/changePasswordRequest';
import { Skill } from 'src/app/model/skillModel';
import { DateSecondsFormat } from 'src/app/model/dateSecondsFormat';
import { MatDialog } from '@angular/material/dialog';
import { SelectTechnologiesDialogComponent } from '../select-technologies-dialog/select-technologies-dialog.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnInit {
  myProfile: Profile = new Profile();
  myProfileTemp: Profile = new Profile();
  experiences: any[] = [];

  changePasswordRequest: ChangePasswordRequest = new ChangePasswordRequest();

  constructor(
    private profileService: ProfileService,
    private loginService: LoginService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  changeProfileFormEditable: boolean = false;
  changeUsernameFormVisible: boolean = false;
  changeEmailFormVisible: boolean = false;
  changePasswordFormVisible: boolean = false;
  changeBiographyFormVisible: boolean = false;
  changeExperienceFormVisible: boolean = false;
  changeNotificationsFormVisible: boolean = false;

  newUsername: string = '';
  newEmail: string = '';
  birthDate: string = '2000-01-01';
  biography: string = '';
  skills: string = '';
  interests: string = '';
  notifications: string = '1';
  showPostNotifications = false;
  showConnectionNotifications = false;
  showMessageNotifications = false;

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

      this.loadExperiences();
    });

    this.notificationService.getNotificationSettings().subscribe((data) => {
      console.log(data);

      if (data.postNotifications != undefined) {
        this.showPostNotifications = data.postNotifications;
      }

      if (data.messageNotifications != undefined) {
        this.showMessageNotifications = data.messageNotifications;
      }

      if (data.connectionNotifications != undefined) {
        this.showConnectionNotifications = data.connectionNotifications;
      }
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

  startChangeExperience() {
    this.cancelAllOtherForms(6);
    this.changeExperienceFormVisible = true;
  }

  cancelChangeExperience() {
    this.changeExperienceFormVisible = false;
    this.loadExperiences();
  }

  startChangeNotifications() {
    this.cancelAllOtherForms(7);
    this.changeNotificationsFormVisible = true;
  }

  cancelChangeNotifications() {
    this.changeNotificationsFormVisible = false;
    this.notificationService.getNotificationSettings().subscribe((data) => {
      console.log(data);

      if (data.postNotifications != undefined) {
        this.showPostNotifications = data.postNotifications;
      }

      if (data.messageNotifications != undefined) {
        this.showMessageNotifications = data.messageNotifications;
      }

      if (data.connectionNotifications != undefined) {
        this.showConnectionNotifications = data.connectionNotifications;
      }
    });
  }

  cancelAllOtherForms(n: number) {
    if (n != 1) this.cancelChangeProfile();
    if (n != 2) this.cancelChangeUsername();
    if (n != 3) this.cancelChangeEmail();
    if (n != 4) this.cancelChangePassword();
    if (n != 5) this.cancelChangeBiography();
    if (n != 6) this.cancelChangeExperience();
    if (n != 7) this.cancelChangeNotifications();
  }

  changeNotifications() {
    let code = '1';

    if (
      !this.showPostNotifications &&
      !this.showConnectionNotifications &&
      !this.showMessageNotifications
    ) {
      code = '2';
    } else if (
      this.showPostNotifications &&
      !this.showConnectionNotifications &&
      !this.showMessageNotifications
    ) {
      code = '3';
    } else if (
      !this.showPostNotifications &&
      this.showConnectionNotifications &&
      !this.showMessageNotifications
    ) {
      code = '4';
    } else if (
      !this.showPostNotifications &&
      !this.showConnectionNotifications &&
      this.showMessageNotifications
    ) {
      code = '5';
    } else if (
      this.showPostNotifications &&
      !this.showConnectionNotifications &&
      this.showMessageNotifications
    ) {
      code = '6';
    } else if (
      !this.showPostNotifications &&
      this.showConnectionNotifications &&
      this.showMessageNotifications
    ) {
      code = '7';
    } else if (
      this.showPostNotifications &&
      this.showConnectionNotifications &&
      !this.showMessageNotifications
    ) {
      code = '8';
    }

    this.notificationService
      .updateNotificationSettings(code)
      .subscribe((data) => {
        if (data) {
          this.loadProfile();
          this.cancelChangeNotifications();
        }
      });
  }

  changeProfile() {
    let requestBody: any;
    requestBody = this.myProfile;
    requestBody.experiences = this.saveExperiences();
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
    requestBody.experiences = this.saveExperiences();
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
    requestBody.experiences = this.saveExperiences();
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
    if (this.skills.trim() != '') {
      for (let skill of this.skills.split(',').map((e) => e.trim())) {
        let newSkill = new Skill();
        newSkill.name = skill;
        newSkill.skillType = 'Skill';
        this.myProfile.skills.push(newSkill);
      }
    }

    if (this.interests.trim() != '') {
      for (let interest of this.interests.split(',').map((e) => e.trim())) {
        let newInterest = new Skill();
        newInterest.name = interest;
        newInterest.skillType = 'Interest';
        this.myProfile.skills.push(newInterest);
      }
    }

    let requestBody: any;
    requestBody = this.myProfile;
    requestBody.experiences = this.saveExperiences();
    requestBody.birthDate = new DateSecondsFormat();
    requestBody.birthDate.seconds = Date.parse(this.birthDate) / 1000 + 45000;

    this.profileService.updateProfileSkills(requestBody).subscribe((data) => {
      this.loadProfile();
      this.cancelChangeBiography();
    });
  }

  addNewExperience() {
    let exp: any = new Object();
    exp.name = '';
    exp.description = '';
    exp.experienceType = 'Work';
    exp.startDate = '2015-05-10';
    exp.endDate = '2017-08-21';
    this.experiences.push(exp);
  }

  deleteExperience(index: number) {
    this.experiences.splice(index, 1);
  }

  changeExperience() {
    let requestBody: any;
    requestBody = this.myProfile;
    requestBody.experiences = this.saveNewExperiences();
    requestBody.birthDate = new DateSecondsFormat();
    requestBody.birthDate.seconds = Date.parse(this.birthDate) / 1000 + 45000;

    this.profileService.updateProfile(requestBody).subscribe((data) => {
      this.loadProfile();
      this.cancelChangeExperience();
    });
  }

  areExperiencesValid() {
    for (let experience of this.experiences) {
      if (
        experience.name == '' ||
        experience.description == '' ||
        experience.startDate == undefined ||
        experience.endDate == undefined
      ) {
        return false;
      }
    }

    return true;
  }

  saveExperiences() {
    let exp: any;
    exp = this.myProfile.experiences;
    for (let experience of exp) {
      let startDate = experience.startDate;
      let endDate = experience.endDate;
      experience.startDate = new DateSecondsFormat();
      experience.startDate.seconds = Date.parse(startDate) / 1000 + 45000;
      experience.endDate = new DateSecondsFormat();
      experience.startDate.endDate = Date.parse(endDate) / 1000 + 45000;
    }

    return exp;
  }

  loadExperiences() {
    this.experiences = [];
    for (let experience of this.myProfile.experiences) {
      let exp: any = new Object();
      exp.name = experience.name;
      exp.experienceType = experience.experienceType;
      exp.description = experience.description;
      if (experience.startDate != undefined) {
        exp.startDate = experience.startDate?.toISOString().split('T')[0];
      }
      if (experience.endDate != undefined) {
        exp.endDate = experience.endDate?.toISOString().split('T')[0];
      }

      this.experiences.push(exp);
    }
  }

  saveNewExperiences() {
    for (let experience of this.experiences) {
      let startDate = experience.startDate;
      let endDate = experience.endDate;
      experience.startDate = new DateSecondsFormat();
      experience.startDate.seconds = Date.parse(startDate) / 1000 + 45000;
      experience.endDate = new DateSecondsFormat();
      experience.startDate.endDate = Date.parse(endDate) / 1000 + 45000;
    }

    return this.experiences;
  }

  generateApiKey() {
    this.profileService.generateApiKey().subscribe(
      (data) => {
        alert('Your Dislinkt API key: ' + data.tokenCode);
      },
      (error) => {
        alert('Unable to generate api token');
      }
    );
  }

  getSkillsCount() {
    if (this.skills != '') {
      return this.skills.split(',').length;
    } else {
      return 0;
    }
  }

  openSkillsDialog() {
    const dialogRef = this.dialog.open(SelectTechnologiesDialogComponent, {
      data: { currentTechnologies: this.skills },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.skills = result;
    });
  }

  getInterestsCount() {
    if (this.interests != '') {
      return this.interests.split(',').length;
    } else {
      return 0;
    }
  }

  openInterestsDialog() {
    const dialogRef = this.dialog.open(SelectTechnologiesDialogComponent, {
      data: { currentTechnologies: this.interests },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.interests = result;
    });
  }
}
