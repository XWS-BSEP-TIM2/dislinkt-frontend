import { Component, OnInit } from '@angular/core';
import { ConnectionDetails } from 'src/app/model/connectionDetails';
import { LoginResponse } from 'src/app/model/loginResponse';
import { ConnectionService } from 'src/app/services/connection.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'suggested-connections-page',
  templateUrl: './suggested-connections-page.component.html',
  styleUrls: ['./suggested-connections-page.component.scss'],
})
export class SuggestedConnectionsPageComponent implements OnInit {
  loginResponse: LoginResponse = new LoginResponse();
  recommendations: ConnectionDetails[] = [];

  constructor(
    private loginService: LoginService,
    private connectionService: ConnectionService
  ) {
    this.loginResponse = this.loginService.getCurrentUser();
  }

  ngOnInit(): void {
    this.connectionService.GetRecommendations().subscribe((data) => {
      this.recommendations = data;
    });

  }
}
