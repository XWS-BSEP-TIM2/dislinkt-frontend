import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginResponse } from 'src/app/model/loginResponse';
import { LoginService } from 'src/app/services/login.service';

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
    // private browseService: BrowseService,
    private route: ActivatedRoute
  ) {
    this.loginResponse = this.loginService.getCurrentUser();
  }

  ngOnInit(): void {
    this.searchText = this.route.snapshot.paramMap.get('searchText')!;

    /*
    this.browseService.getAllPosts().subscribe((data) => {
      if (data != null) {
        data.sort((a: Post, b: Post) => (a.timestamp < b.timestamp ? 1 : -1));
        this.posts = this.filterData(data);
        this.loaded = true;
      }
    });
    */
  }

  /*
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
    if (post.type == 'NEW_USER') {
      return (post.user.email + post.user.name + post.user.surname)
        .trim()
        .toLocaleLowerCase()
        .replace(/ /g, '');
    } else if (post.type == 'NEW_COMPANY') {
      return (
        post.company.name +
        post.company.description +
        post.company.tagline +
        post.company.technologies.toString() +
        post.company.emailList.toString() +
        post.company.phoneNumberList.toString() +
        post.company.user.email +
        post.company.user.name +
        post.company.user.surname
      )
        .trim()
        .toLocaleLowerCase()
        .replace(/ /g, '');
    } else {
      return (
        post.jobOffer.description +
        post.jobOffer.company.name +
        post.jobOffer.position +
        post.jobOffer.seniority +
        post.jobOffer.technologies.toString()
      )
        .trim()
        .toLocaleLowerCase()
        .replace(/ /g, '');
    }
  }
  */
}
