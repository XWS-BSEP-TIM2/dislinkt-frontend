import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private profileService:ProfileService) { }

  ngOnInit(): void {
    this.profileService.getProfilesByAdmin().subscribe(data=>{
      console.log(data);
    })
  }

}
