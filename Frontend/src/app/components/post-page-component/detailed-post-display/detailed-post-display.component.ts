import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhotoLightBoxComponent } from '../photo-light-box/photo-light-box.component';

@Component({
  selector: 'detailed-post-display',
  templateUrl: './detailed-post-display.component.html',
  styleUrls: ['./detailed-post-display.component.scss'],
})
export class DetailedPostDisplayComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  redirectAuthorProfile() {
    window.location.href = 'user/1';
  }

  openImageLightbox() {
    this.dialog.open(PhotoLightBoxComponent);
  }
}
