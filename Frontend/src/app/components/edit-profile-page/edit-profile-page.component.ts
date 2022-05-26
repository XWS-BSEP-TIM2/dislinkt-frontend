import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/model/profileModel';
import { ChangePasswordRequest } from 'src/app/model/changePasswordRequest';

@Component({
  selector: 'edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss']
})
export class EditProfilePageComponent implements OnInit {

  myProfile: Profile = new Profile();
  myProfileTemp: Profile = new Profile();

  changePasswordRequest: ChangePasswordRequest = new ChangePasswordRequest();

  constructor(private profileService: ProfileService, private loginService: LoginService) { 
  }


  changeProfileFormEditable: boolean = false;
  changeUsernameFormVisible: boolean = false;
  changeEmailFormVisible: boolean = false;
  changePasswordFormVisible: boolean = false;

  newUsername: string = '';
  newEmail: string = '';

  ngOnInit(): void {
    this.loadProfile()
  }

  loadProfile() {
    let myId = this.loginService.getCurrentUser().userID;
    this.profileService.getUserById(myId).subscribe((data) => {
      this.myProfile = data.profile;
      this.myProfileTemp = this.myProfile; //reference oboje pokazuju na isto
      this.changePasswordRequest.username = this.myProfile.username;
      console.log(this.myProfile);
    });
  }

  startChangeProfile() {
    this.cancelAllOtherForms(1)
    this.myProfileTemp = JSON.parse(JSON.stringify(this.myProfile));
    this.changeProfileFormEditable = true;
  }
  cancelChangeProfile() {
    this.myProfile = this.myProfileTemp;
    this.changeProfileFormEditable = false;
  }

  startChangeUsername() {
    this.cancelAllOtherForms(2)
    this.changeUsernameFormVisible = true;
  }
  cancelChangeUsername() {
    this.changeUsernameFormVisible = false;
    this.newUsername = '';
  }

  startChangeEmail() {
    this.cancelAllOtherForms(3)
    this.changeEmailFormVisible = true;
  }
  cancelChangeEmail() {
    this.changeEmailFormVisible = false;
    this.newEmail = '';
  }

  startChangePassword() {
    this.cancelAllOtherForms(4)
    this.changePasswordFormVisible = true;
  }
  cancelChangePassword() {
    this.changePasswordFormVisible = false;
    this.changePasswordRequest = new ChangePasswordRequest();
    this.changePasswordRequest.username = this.myProfile.username;
  }

  cancelAllOtherForms(n: number) {
    if(n!=1) this.cancelChangeProfile();
    if(n!=2) this.cancelChangeUsername();
    if(n!=3) this.cancelChangeEmail();
    if(n!=4) this.cancelChangePassword();
  }

  changeProfile() {
    this.myProfileTemp = this.myProfile;
    alert("TODO: poslati zahtev ka bekendu da se izmeni Profil")
    //todo
    this.changeProfileFormEditable = false;
  }
  
  changeUsername() {
    alert("TODO: poslati zahtev ka bekendu da se izmeni Username")
    //todo

    this.cancelChangeUsername();
  }

  changeEmail() {
    alert("TODO: poslati zahtev ka bekendu da se izmeni Email")
    //todo

    this.cancelChangeEmail();
  }

  changePassword() {
    if (!this.changePasswordRequest.validateProperty()) {
      alert('All property must be valid')
      return
    }
    this.profileService.changePassword(this.changePasswordRequest).subscribe(
      (data) => {
        console.log(data)
        if (data != null) {
          alert(data.msg)
          if(data.status == 200)
          this.cancelChangePassword();
        } else {
          alert('error?')
        }
      },
      (error)=>{
        alert('ERROR');
      });
  }





}
