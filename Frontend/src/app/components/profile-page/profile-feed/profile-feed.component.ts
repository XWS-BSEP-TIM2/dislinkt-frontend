import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.scss'],
})
export class ProfileFeedComponent implements OnInit {
  searchText: string = '';

  constructor() {}

  ngOnInit(): void {}

  resetSearch() {
    this.searchText = '';
  }
}
