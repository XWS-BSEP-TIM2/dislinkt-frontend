import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewPostDialogComponent } from '../../new-post-dialog/new-post-dialog.component';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  currentPage?: string = '';

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log(this.router.url);
    this.currentPage = this.router.url.substring(1);
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
