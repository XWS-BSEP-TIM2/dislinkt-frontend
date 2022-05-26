import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/model/loginRequest';
import { LoginResponse } from 'src/app/model/loginResponse';
import { RecoveryRequest } from 'src/app/model/recoveryRequest';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginRequest: LoginRequest = new LoginRequest()
  errorMessage = ''
  mail='';

  recoveryFormVisible = false;
  recoveryRequest: RecoveryRequest = new RecoveryRequest()
  recoveryMsg = ''

  constructor(private loginService: LoginService, private route: Router) { }

  ngOnInit(): void {
  }

  forggotPassword() {
    this.recoveryMsg = ''
    this.recoveryRequest.username = this.loginRequest.username;
    this.loginService.forggotPasswrod(this.loginRequest.username).subscribe(
      (data) => {
        if (data.status == 4) {
          this.errorMessage = "";
          this.recoveryMsg = data.msg
          this.recoveryFormVisible = true
        } else {
          this.errorMessage = data.msg;
        }
      },
      (err) => {
        this.errorMessage = "Error recovery"
      }
    );
  }

  login() {
    if (this.recoveryFormVisible) {
      this.sendRecoveryRequest()
      return 
    }

    if (!this.loginRequest.validateProperty()) {
      this.errorMessage = 'Email or password missing.';
    } else {
      this.errorMessage = '';
      this.loginService.login(this.loginRequest).subscribe(
        (data) => {
          if (data.error == undefined || data.error === '')
            this.successfulLogin(data);
          else {
            this.errorMessage = data.error
          }
        },
        (res) => (this.errorMessage = 'Invalid email or password.')
      );
    }
  }

  successfulLogin(loginRespons: LoginResponse) {
    this.errorMessage = '';
    //console.log(loginRespons);
    this.loginService.loginSetUser(loginRespons);
  }

  sendRecoveryRequest() {
    this.recoveryRequest.username = this.loginRequest.username;
    if (!this.recoveryRequest.validateProperty()) {
      this.errorMessage = 'Email or password missing.';
    } else {
      this.errorMessage = '';
      this.loginService.loginRecoverRequest(this.recoveryRequest).subscribe(
        (data) => {
          if (data.error == undefined || data.error === '')
            this.successfulLogin(data);
          else {
            //alert(data.error); 
            this.errorMessage = data.error
          }
        },
        (res) => (this.errorMessage = 'Error login recovery')
      );
    }
  }

  resendVerificationLink() {
    this.errorMessage = ''
    this.loginService.resendVerification(this.loginRequest.username).subscribe(
      (data) => { 
        this.errorMessage = data.msg;
      },
      (err) => {
        this.errorMessage = 'Error resend verification link'
    })
  }

  showResendVerificationLink() {
    return this.errorMessage.includes('Your Acc is not verified')
  }

  openModalTab():void{
    document.getElementById('modal')?.classList.toggle('is-active');
  }

  closeModalTab():void{
    document.getElementById('modal')?.classList.toggle('is-active');
  }

  sendMagicLinkMail():void{
    this.loginService.sendMagicLinkMail(this.mail);
    console.log(this.mail);
    this.closeModalTab();
  }

}
