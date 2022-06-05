import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profileModel';

@Component({
  selector: 'public-account-display',
  templateUrl: './public-account-display.component.html',
  styleUrls: ['./public-account-display.component.scss'],
})
export class PublicAccountDisplayComponent implements OnInit {
  @Input() user: Profile = new Profile();
  constructor() {}

  ngOnInit(): void {}

  redirect() {
    window.location.href = '/profile/' + this.user.id;
  }
}
