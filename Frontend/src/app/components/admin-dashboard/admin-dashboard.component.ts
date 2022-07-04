import { Component, OnInit } from '@angular/core';
import { timeOffset } from 'src/app/app-global';
import { EventModel } from 'src/app/model/EventModel';
import { Profile } from 'src/app/model/profileModel';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  events: EventModel[] = [];
  profiles: Profile[] = [];

  totalEvents: number = 0;
  totalUsers: number = 0;
  totalPosts: number = 0;

  constructor(
    private profileService: ProfileService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.profileService.getProfilesByAdmin().subscribe((data) => {
      if (data.profiles != undefined) {
        this.profiles = data.profiles;
      }

      this.totalUsers = this.profiles.length;
    });

    this.profileService.getEvents().subscribe((data) => {
      if (data.events != undefined) {
        this.events = data.events;
        this.events = this.events.map((e) => {
          e.dateDisplay = this.getDateFromSeconds(e.date.seconds);
          return e;
        });

        this.events = this.events.sort((a, b) =>  b.date.seconds - a.date.seconds)
      }

      this.totalEvents = this.events.length;

      this.totalPosts = this.events.filter((e) =>
        e.title.toLowerCase().includes('post')
      ).length;
    });
  }

  logout() {
    this.loginService.logout();
  }

  getDateFromSeconds(seconds: number): Date {
    var date = new Date(1970, 0, 1); // Epoch
    date.setSeconds(seconds + timeOffset);
    return date;
  }
}
