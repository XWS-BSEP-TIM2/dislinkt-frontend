import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent implements OnInit {
  @Input() isMe!: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
