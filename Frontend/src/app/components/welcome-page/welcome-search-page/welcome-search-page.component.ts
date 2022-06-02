import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'welcome-search-page',
  templateUrl: './welcome-search-page.component.html',
  styleUrls: ['./welcome-search-page.component.scss'],
})
export class WelcomeSearchPageComponent implements OnInit {
  posts: any[] = [];
  searchText: string = '';
  loaded: boolean = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchText = this.route.snapshot.paramMap.get('searchText')!;

    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data.posts;
      this.posts = this.filterData(this.posts);
      this.loaded = true;
    });
  }
  filterData(posts: Post[]) {
    let filtered: Post[] = [];
    for (let post of posts) {
      if (this.squishPostContent(post).includes(this.searchText)) {
        filtered.push(post);
      }
    }

    return filtered;
  }

  squishPostContent(post: Post): string {
    return (
      post.content +
      post.owner.name +
      post.owner.surname +
      post.owner.username
    )
      .trim()
      .toLocaleLowerCase()
      .replace(/ /g, '');
  }
}
