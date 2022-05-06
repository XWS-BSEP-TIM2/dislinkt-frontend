import { Component, OnInit } from '@angular/core';
import { LoginRespons } from 'src/app/model/loginResponse';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  loginRespons: LoginRespons = new LoginRespons();

  constructor(private loginService: LoginService) { 
    this.loginRespons = this.loginService.getCurrentUser();
  }

  ngOnInit(): void {
  }

}
