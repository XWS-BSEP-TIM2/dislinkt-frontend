import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'welcome-page-sidebar',
  templateUrl: './welcome-page-sidebar.component.html',
  styleUrls: ['./welcome-page-sidebar.component.scss'],
})
export class WelcomePageSidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  redirectLogin() {
    window.location.href = '/login';
  }

  redirectRegister() {
    window.location.href = '/register';
  }
}
