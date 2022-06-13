import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/model/Message';

@Component({
  selector: 'chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent implements OnInit {
  
  @Input() message: Message = new Message();
  @Input() isMe: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
