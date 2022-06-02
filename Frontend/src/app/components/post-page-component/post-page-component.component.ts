import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, PostComment } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'post-page-component',
  templateUrl: './post-page-component.component.html',
  styleUrls: ['./post-page-component.component.scss'],
})
export class PostPageComponentComponent implements OnInit {
  post: Post = new Post();
  postId: string = '';
  comments: PostComment[] = [];

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;

    this.postService.getPostHref('posts/' + this.postId).subscribe((data) => {
      this.post = data.post;

      this.postService.getPostHref(this.post.hrefs[1].url).subscribe((data) => {
        if (data.comments != undefined) {
          this.comments = data.comments;
          this.comments.reverse();
        }
      });
    });
  }

  refreshComments() {
    this.postService.getPostHref(this.post.hrefs[1].url).subscribe((data) => {
      if (data.comments != undefined) {
        this.comments = data.comments;
        this.comments.reverse();
      }
    });
  }
}
