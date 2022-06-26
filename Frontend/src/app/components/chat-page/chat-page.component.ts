import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { ChatPreview } from 'src/app/model/ChatPreview'; 
import { Message } from 'src/app/model/Message';
import { Chat } from 'src/app/model/Chat';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {

  chatPreviews: ChatPreview[] = [];
  chat: Chat = new Chat();

  chatRefreshFunc: any = null;
  contactRefreshFunc: any = null;


  constructor(private messageService: MessageService) { }

  ngOnDestroy(): void {
    console.log("ngOnDestroy destroy chat and contact refresh func")
    clearInterval(this.chatRefreshFunc)
    clearInterval(this.contactRefreshFunc)
  }

  ngOnInit(): void {
    this.getMyContacts()
    let self = this
    this.contactRefreshFunc = setInterval(function () {
      self.getMyContacts()
    }, 5000);
  } 

  getMyContacts() {
    this.messageService.getMyContacts().subscribe((data) => {
      this.chatPreviews = data.chats;
      console.log(this.chatPreviews)
    }, (err) => {
        alert(err)
    });
  }

  showChat(chatPreview: ChatPreview) {
    //alert(chatPreview.fullNameUser)
    clearInterval(this.chatRefreshFunc)
    this.loadChat(chatPreview)

    let self = this
    this.chatRefreshFunc = setInterval(function () {
      self.loadChat(chatPreview);
    }, 1000);
  }

  loadChat(chatPreview: ChatPreview) {
    this.messageService.getChat(chatPreview.msgID).subscribe((data) => {
      this.chat = data.chat;
      console.log(this.chat)
      chatPreview.numOfNewMessages = 0;
      if(this.chat.messages != null && this.chat.messages.length > 0)
        chatPreview.lastMessage = this.chat.messages[this.chat.messages.length - 1]
    }, (err) => {
        alert(err)
    });
  }
  

}