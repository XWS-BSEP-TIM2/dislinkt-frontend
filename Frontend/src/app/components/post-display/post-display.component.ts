import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.scss'],
})
export class PostDisplayComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  redirectAuthorProfile() {
    window.location.href = 'user/1';
  }

  redirectPostPage() {
    window.location.href = 'post/1';
  }
}
