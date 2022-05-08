import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/model/loginRequest';
import { LoginResponse } from 'src/app/model/loginResponse';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginRequest: LoginRequest = new LoginRequest()
  errorMessage = ''

  constructor(private loginService: LoginService, private route: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (!this.loginRequest.validateProperty()) {
      this.errorMessage = 'Email or password missing.';
    } else {
      this.errorMessage = '';
      this.loginService.login(this.loginRequest).subscribe(
        (data) => {
          if (data.error === '')
            this.successfulLogin(data);
          else
            alert(data.error);
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

}
