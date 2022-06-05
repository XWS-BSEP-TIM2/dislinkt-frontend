import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConnectionDetails } from 'src/app/model/connectionDetails';
import { ConnectionService } from 'src/app/services/connection.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'profile-connections',
  templateUrl: './profile-connections.component.html',
  styleUrls: ['./profile-connections.component.scss'],
})
export class ProfileConnectionsComponent implements OnInit {
  friends: ConnectionDetails[] = [];

  constructor(
    private route: ActivatedRoute,
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    let targetUserID = window.location.pathname.substring(6).split('/')[1];
    this.connectionService.GetFriends(targetUserID).subscribe((data) => {
      this.friends = data;
    });
  }
}
