import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/model/Chat';
import { LoginResponse } from 'src/app/model/loginResponse';
import { Message } from 'src/app/model/Message';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {

  @Input() chat: Chat = new Chat();
  loginResponse!: LoginResponse;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginResponse = this.loginService.getCurrentUser();
  }

  isMe(message: Message): boolean{
    return this.loginResponse.userID == message.authorUserID
  }

}
