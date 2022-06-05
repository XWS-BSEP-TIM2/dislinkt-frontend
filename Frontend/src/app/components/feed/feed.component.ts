import { Component, OnInit } from '@angular/core';
import { LoginResponse } from 'src/app/model/loginResponse';
import { Post } from 'src/app/model/post';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  posts: Post[] = [];

  loginRespons: LoginResponse = new LoginResponse();

  constructor(
    private loginService: LoginService,
    private postService: PostService
  ) {
    this.loginRespons = this.loginService.getCurrentUser();
  }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data.posts;
    });
  }
}
