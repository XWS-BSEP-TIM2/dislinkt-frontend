import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/model/Chat';
import { LoginResponse } from 'src/app/model/loginResponse';
import { Message } from 'src/app/model/Message';
import { SendMessageRequest } from 'src/app/model/SendMessageRequest';
import { LoginService } from 'src/app/services/login.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {

    private _chat: Chat = new Chat();
    
  @Input() set chat(value: Chat) {
      console.log("@Input() set chat(value: Chat) POZVANA")
      this._chat = value;
      if (this._chat.messages == null) {
        this._chat.messages = [] 
      }
      else {
        if (this._chat.messages.length != this.lastMessageNum) {
          //this.scrollChat()
        }
        this.lastMessageNum = this._chat.messages.length
      }
    
      this.setSeen();
    }
    get chat(): Chat { return this._chat; }


  loginResponse!: LoginResponse;

  message: Message = new Message();

  lastMessageNum: number = 0;

  constructor(private loginService: LoginService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loginResponse = this.loginService.getCurrentUser();
  }

  setSeen() {
    if(this.chat.msgID === '') return
    let setSeenReq = {"msgID":this.chat.msgID,"userID":this.chat.userIDa}
    console.log(setSeenReq)
    this.messageService.setSeen(setSeenReq).subscribe((data) => {
      console.log(data)
    }, (err) => {
        //alert(err)
        console.log(err)
    });
  }

  isMe(message: Message): boolean{
    return this.loginResponse.userID == message.authorUserID
  }

  sendMessage() {
    if(this.message.text === "" || this.message.text.trim().length === 0) return
    //let sendMsgReq = new SendMessageRequest(this.chat.msgID, this.chat.userIDa, this.chat.userIDb, this.message.text, parseInt((new Date().getTime()/1000).toFixed()))
    let sendMsgReq = new SendMessageRequest(this.chat.msgID, this.chat.userIDa, this.chat.userIDb, this.message.text)
    console.log(sendMsgReq)
    this._chat.messages.push(new Message(this.chat.userIDa, this.message.text))
    this.message.text = ""
    //this.lastMessageNum++
    //this.scrollChat()
    this.messageService.sendMessage(sendMsgReq).subscribe((data) => {
      console.log(data)

    }, (err) => {
        console.log(err)
        //alert(err)
    });
  }

  scrollChat() {
    let element = document.getElementById("ChatDialogID")
    console.log(element)
    if(element != null)
      element.scroll(0, 100000);
  }

  ngForCallback() {
    this.scrollChat()
    console.log("RERENDERRRRR TYESSSSSSSSSS")
  }

}
