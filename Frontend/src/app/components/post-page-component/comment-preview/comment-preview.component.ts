import { Component, Input, OnInit } from '@angular/core';
import { PostComment } from 'src/app/model/post';

@Component({
  selector: 'comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.scss'],
})
export class CommentPreviewComponent implements OnInit {
  @Input() comment: PostComment = new PostComment();

  constructor() {}

  ngOnInit(): void {}
}
