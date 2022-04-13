import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'welcome-page-header',
  templateUrl: './welcome-page-header.component.html',
  styleUrls: ['./welcome-page-header.component.scss'],
})
export class WelcomePageHeaderComponent implements OnInit {
  searchText: string = '';

  constructor() {}

  ngOnInit(): void {}

  resetSearch() {
    this.searchText = '';
  }
}
