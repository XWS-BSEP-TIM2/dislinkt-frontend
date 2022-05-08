import { Component, Input, OnInit } from '@angular/core';
import { ConnectionPanelModel } from 'src/app/model/connectionPanelModel';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'connect-panel',
  templateUrl: './connect-panel.component.html',
  styleUrls: ['./connect-panel.component.scss']
})
export class ConnectPanelComponent implements OnInit {

  @Input() userIDa: string = '';
  @Input() userIDb: string = '';

  connectionPanelModel!: ConnectionPanelModel;

  ready: boolean = false

  constructor(private connectionService: ConnectionService) {
    this.loadData()
  }

  loadData() {
    this.connectionPanelModel = new ConnectionPanelModel();
    this.connectionService.GetDetail(this.userIDa, this.userIDb).subscribe((data) => {
      //console.log(data);
      this.connectionPanelModel = data;
      this.ready = true;
      //console.log(this.connectionPanelModel)
    });  
  }

  ngOnInit(): void {
    this.loadData()
  }

  connectBtnAvailable(): boolean{
    return this.connectionPanelModel.relation === 'NO_RELATION' && !this.connectionPanelModel.isPrivate;
  }

  connecPrivtBtnAvailable(): boolean {
    return this.connectionPanelModel.relation === 'NO_RELATION' && this.connectionPanelModel.isPrivate;
  }

  connectedBtnAvailable(): boolean{
    return this.connectionPanelModel.relation === 'CONNECTED';
  }

  messageAvailable(): boolean{
    return this.connectionPanelModel.relation === 'CONNECTED';
  }

  blockAvailable(): boolean{
    return this.connectionPanelModel.relation !== 'B_BLOCK_A' && this.connectionPanelModel.relation !== 'A_BLOCK_B';
  }

  unblockAvailable(): boolean{
    return this.connectionPanelModel.relation === 'A_BLOCK_B';
  }

  pendingBtnAvailable(): boolean{
    return this.connectionPanelModel.relation === 'PENDING';
  }

  acceptBtnAvailable(): boolean{
    return this.connectionPanelModel.relation === 'ACCEPT';
  }

  // =============================== ACTIONS
  connectBtn() {
    this.connectionService.AddFriend(this.userIDa, this.userIDb).subscribe((data) => {
      //console.log(data);
      this.loadData();
    });  
  }

  connecPrivtBtn() {
    this.connectionService.SendFriendRequest(this.userIDa, this.userIDb).subscribe((data) => {
      //console.log(data);
      this.loadData();
    });  
  }

  cancelRequestBtn() {
    this.connectionService.UnsendFriendRequest(this.userIDa, this.userIDb).subscribe((data) => {
      //console.log(data);
      this.loadData();
    });  
  }

  acceptBtn() {
    this.connectionService.AddFriend(this.userIDa, this.userIDb).subscribe((data) => {
      //console.log(data);
      this.loadData();
    });  
  }

  disconnectBtn() {
    this.connectionService.RemoveFriend(this.userIDa, this.userIDb).subscribe((data) => {
      //console.log(data);
      this.loadData();
    });  
  }

  block() {
    this.connectionService.AddBlockUser(this.userIDa, this.userIDb).subscribe((data) => {
      //console.log(data);
      this.loadData();
    });  
  }

  unblock() {
    this.connectionService.UnblockUser(this.userIDa, this.userIDb).subscribe((data) => {
      //console.log(data);
      this.loadData();
    });  
  }

}
