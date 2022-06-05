import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobOffer } from 'src/app/model/jobOffer';
import { Post } from 'src/app/model/post';
import { Profile } from 'src/app/model/profileModel';
import { JobOfferService } from 'src/app/services/job-offer.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'welcome-search-page',
  templateUrl: './welcome-search-page.component.html',
  styleUrls: ['./welcome-search-page.component.scss'],
})
export class WelcomeSearchPageComponent implements OnInit {
  posts: any[] = [];
  offers: JobOffer[] = [];
  users: Profile[] = [];
  searchText: string = '';
  loaded: boolean = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private jobOfferService: JobOfferService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.searchText = this.route.snapshot.paramMap.get('searchText')!;

    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data.posts;
      this.posts = this.filterData(this.posts);
      this.loaded = true;
    });

    this.jobOfferService.getAllJobOffers().subscribe((data) => {
      this.offers = data.jobOffers;
      this.offers = this.filterJobOffers(this.offers);
    });

    this.profileService.getAllUsers().subscribe((data) => {
      this.users = data.profiles;
      this.users = this.filterUsers(this.users);
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

  filterJobOffers(offers: JobOffer[]) {
    let filtered: JobOffer[] = [];
    for (let offer of offers) {
      if (this.squishOfferContent(offer).includes(this.searchText)) {
        filtered.push(offer);
      }
    }

    return filtered;
  }

  filterUsers(users: Profile[]) {
    let filtered: Profile[] = [];
    for (let user of users) {
      if (this.squishUserContent(user).includes(this.searchText)) {
        filtered.push(user);
      }
    }

    return filtered;
  }

  squishUserContent(user: Profile): string {
    return (user.name + user.email + user.surname)
      .trim()
      .toLocaleLowerCase()
      .replace(/ /g, '');
  }

  squishOfferContent(offer: JobOffer): string {
    return (
      offer.companyName +
      offer.description +
      offer.position +
      offer.seniority
    )
      .trim()
      .toLocaleLowerCase()
      .replace(/ /g, '');
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
