import { Component, OnInit } from '@angular/core';
import { ConnectionDetails } from 'src/app/model/connectionDetails';
import { ConnectionService } from 'src/app/services/connection.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'profile-blocks',
  templateUrl: './profile-blocks.component.html',
  styleUrls: ['./profile-blocks.component.scss'],
})
export class ProfileBlocksComponent implements OnInit {
  constructor(private connectionService: ConnectionService) {}

  blockeds!: ConnectionDetails[];

  loadData() {
    this.connectionService.GetBlockeds().subscribe((data) => {
      this.blockeds = data;
    });
  }

  ngOnInit(): void {
    this.loadData();
  }
}
