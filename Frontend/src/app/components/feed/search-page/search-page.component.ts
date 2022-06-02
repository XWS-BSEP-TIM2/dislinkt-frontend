import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginResponse } from 'src/app/model/loginResponse';
import { Post } from 'src/app/model/post';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  posts: any[] = [];
  loginResponse: LoginResponse = new LoginResponse();
  searchText: string = '';
  loaded: boolean = false;

  constructor(
    private loginService: LoginService,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.loginResponse = this.loginService.getCurrentUser();
  }

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
