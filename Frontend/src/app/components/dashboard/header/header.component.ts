import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchText: string = '';

  constructor() {}

  ngOnInit(): void {}

  resetSearch() {
    this.searchText = '';
  }
}
