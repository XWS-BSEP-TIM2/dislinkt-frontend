import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Experience } from 'src/app/model/experienceModel';
import { Post } from 'src/app/model/post';
import { Profile } from 'src/app/model/profileModel';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.scss'],
})
export class ProfileFeedComponent implements OnInit {
  userProfile: Profile = new Profile();
  workExperiences: Experience[] = [];
  educationExperiences: Experience[] = [];
  userPosts: Post[] = [];

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.userProfile.id = this.route.snapshot.paramMap.get('id')!;

    this.profileService.getUserById(this.userProfile.id).subscribe((data) => {
      this.profileService.modifyProfileData(data);
      this.userProfile = data.profile;
      if (data.biography == undefined) {
        this.userProfile.biography = '';
      }
      if (data.skills == undefined) {
        this.userProfile.skills = [];
      }
      if (data.experiences == undefined) {
        this.userProfile.experiences = [];
      }
      this.initExperiences();
    });

    this.postService.getPostsByUser(this.userProfile.id).subscribe((data) => {
      if (data.posts != undefined) {
        this.userPosts = data.posts;
        this.userPosts = this.userPosts.sort(
          (a, b) => b.creation_time.seconds - a.creation_time.seconds
        );
      }
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

  getSkillsCount() {
    return this.userProfile.skills.filter((e) => e.skillType == 'Skill').length;
  }

  getInterestsCount() {
    return this.userProfile.skills.filter((e) => e.skillType == 'Interest')
      .length;
  }
}
