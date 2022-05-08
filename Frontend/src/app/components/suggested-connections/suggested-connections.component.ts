import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionDetails } from 'src/app/model/connectionDetails';
import { LoginResponse } from 'src/app/model/loginResponse';
import { ConnectionService } from 'src/app/services/connection.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'suggested-connections',
  templateUrl: './suggested-connections.component.html',
  styleUrls: ['./suggested-connections.component.scss'],
})
export class SuggestedConnectionsComponent implements OnInit {
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

  redirectConnections() {
    window.location.href = 'connections';
  }
}
