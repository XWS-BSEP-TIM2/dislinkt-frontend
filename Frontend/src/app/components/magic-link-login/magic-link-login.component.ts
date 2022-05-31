import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginResponse } from '../../model/loginResponse';
import { PasswordlessLoginModel } from '../../model/passwordlessLoginModel';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'magic-link-login',
  templateUrl: './magic-link-login.component.html',
  styleUrls: ['./magic-link-login.component.scss'],
})
export class MagicLinkLoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {}

  errorMessage = '';
  tokenCode: string = '';
  token: PasswordlessLoginModel = {
    tokenCode: '',
  };

  ngOnInit(): void {
    this.tokenCode = this.route.snapshot.paramMap.get('id')!;
    this.token.tokenCode = this.tokenCode;

    this.loginService.loginPasswordless(this.token).subscribe(
      (data: any) => {
        if (data.error === undefined || data.error === '')
          this.successfulLogin(data);
        else {
          this.errorMessage = data.error;
        }
      },
      (error: any) => {
        this.errorMessage = 'Error!';
      }
    );
  }

  sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  async successfulLogin(loginRespons: LoginResponse) {
    this.errorMessage = '';
    await this.sleep(5000); //wait 5 seconds
    this.loginService.loginSetUser(loginRespons);
  }
}
