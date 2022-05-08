import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Experience } from 'src/app/model/experienceModel';
import { Profile } from 'src/app/model/profileModel';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.scss'],
})
export class ProfileFeedComponent implements OnInit {
  userProfile: Profile = new Profile();
  searchText: string = '';
  workExperiences: Experience[] = [];
  educationExperiences: Experience[] = [];

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userProfile.id = this.route.snapshot.paramMap.get('id')!;

    this.profileService.getUserById(this.userProfile.id).subscribe((data) => {
      this.userProfile = data.profile;
      this.initExperiences();
    });
  }

  initExperiences() {
    for (let experience of this.userProfile.experiences) {
      if (experience.experienceType == 'Education') {
        this.educationExperiences.push(experience);
      } else {
        this.workExperiences.push(experience);
      }
    }
  }

  resetSearch() {
    this.searchText = '';
  }
}
