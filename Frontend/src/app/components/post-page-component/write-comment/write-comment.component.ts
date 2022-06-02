import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/model/post';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.scss'],
})
export class WriteCommentComponent implements OnInit {
  @Input() post: Post = new Post();
  @Output() refresh = new EventEmitter<boolean>();
  commentContent: string = '';

  constructor(
    private loginService: LoginService,
    private postService: PostService
  ) {}

  ngOnInit(): void {}

  discardComment() {
    this.commentContent = '';
  }

  publishComment() {
    let requestBody: any = new Object();
    requestBody.ownerId = this.loginService.getCurrentUser().userID;
    requestBody.content = this.commentContent;
    this.postService
      .postPostHref(this.post.hrefs[1].url, requestBody)
      .subscribe((data) => {
        this.refresh.emit(true);
        this.commentContent = '';
      });
  }
}
