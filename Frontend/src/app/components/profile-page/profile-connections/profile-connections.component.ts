import { Component, OnInit } from '@angular/core';
import { ConnectionDetails } from 'src/app/model/connectionDetails';
import { ConnectionService } from 'src/app/services/connection.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'profile-connections',
  templateUrl: './profile-connections.component.html',
  styleUrls: ['./profile-connections.component.scss']
})
export class ProfileConnectionsComponent implements OnInit {

  constructor(private loginService: LoginService, private connectionService: ConnectionService) { }

  friends!: ConnectionDetails[];

  loadData() {
    let targetUserID = window.location.pathname.substring(6).split('/')[0]
    this.connectionService.GetFriends(targetUserID).subscribe((data) => {
      //console.log(data);
      this.friends = data;
    });  
  }

  ngOnInit(): void {
   this.loadData()
  }

}
