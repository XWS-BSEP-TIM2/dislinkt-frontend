import { Component, Input, OnInit } from '@angular/core';
import { PostComment } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.scss'],
})
export class CommentPreviewComponent implements OnInit {
  @Input() comment: PostComment = new PostComment();

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.comment = this.postService.modifyCommentDateFromSeconds(this.comment);
  }
}
