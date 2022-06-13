import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { ChatPreview } from 'src/app/model/ChatPreview'; 
import { Message } from 'src/app/model/Message';

@Component({
  selector: 'chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  chatPreviews: ChatPreview[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.getMyContacts().subscribe((data) => {
      this.chatPreviews = data.chats;
      console.log(this.chatPreviews)
    }, (err) => {
        alert(err)
    });

    
  } 

}