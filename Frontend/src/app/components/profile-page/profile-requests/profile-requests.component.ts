import { Component, OnInit } from '@angular/core';
import { ConnectionDetails } from 'src/app/model/connectionDetails';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'profile-requests',
  templateUrl: './profile-requests.component.html',
  styleUrls: ['./profile-requests.component.scss']
})
export class ProfileRequestsComponent implements OnInit {

 
  constructor(private connectionService: ConnectionService) { }

  connectionRequest!: ConnectionDetails[];

  loadData() {
    this.connectionService.GetFriendRequests().subscribe((data) => {
      console.log(data);
      this.connectionRequest = data;
    });  
  }

  ngOnInit(): void {
   this.loadData()
  }

}
