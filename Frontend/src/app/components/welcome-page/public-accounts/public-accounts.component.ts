import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profileModel';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'public-accounts',
  templateUrl: './public-accounts.component.html',
  styleUrls: ['./public-accounts.component.scss'],
})
export class PublicAccountsComponent implements OnInit {
  users: Profile[] = [];

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getAllUsers().subscribe((data) => {
      this.users = data.profiles;
    });
  }
}
