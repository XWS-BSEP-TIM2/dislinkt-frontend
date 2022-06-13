import { Component, Input, OnInit } from '@angular/core';
import { ChatPreview } from 'src/app/model/ChatPreview';

@Component({
  selector: 'single-contact',
  templateUrl: './single-contact.component.html',
  styleUrls: ['./single-contact.component.scss']
})
export class SingleContactComponent implements OnInit {

  @Input() chatPreview: ChatPreview = new ChatPreview(); 

  constructor() { }

  ngOnInit(): void {
  }

}
