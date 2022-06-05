import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profileModel';

@Component({
  selector: 'profile-preview',
  templateUrl: './profile-preview.component.html',
  styleUrls: ['./profile-preview.component.scss'],
})
export class ProfilePreviewComponent implements OnInit {
  @Input() user: Profile = new Profile();

  constructor() {}

  ngOnInit(): void {}

  redirect() {
    window.location.href = '/profile/' + this.user.id;
  }
}
