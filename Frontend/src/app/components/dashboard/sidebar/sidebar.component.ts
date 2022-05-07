import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginRespons } from 'src/app/model/loginResponse';
import { LoginService } from 'src/app/services/login.service';
import { NewPostDialogComponent } from '../../new-post-dialog/new-post-dialog.component';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  currentPage?: string = '';

  loginUser!: LoginRespons

  constructor(private router: Router, public dialog: MatDialog, private loginService: LoginService) {}

  ngOnInit(): void {
    console.log(this.router.url);
    this.currentPage = this.router.url.substring(1);
    this.loginUser = this.loginService.getCurrentUser();
  }

  redirect() {
    console.log(this.currentPage);
    this.router.navigate([this.currentPage]);
  }

  redirectFeed() {
    this.currentPage = '';
    this.redirect();
  }

  newPost() {
    const dialogRef = this.dialog.open(NewPostDialogComponent, {
      position: { top: '75px' },
    });
  }
}
