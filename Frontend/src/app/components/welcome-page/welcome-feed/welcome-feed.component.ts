import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'welcome-feed',
  templateUrl: './welcome-feed.component.html',
  styleUrls: ['./welcome-feed.component.scss'],
})
export class WelcomeFeedComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data.posts;
    });
  }
}
