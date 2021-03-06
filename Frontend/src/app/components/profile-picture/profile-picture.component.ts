import { Component, Input, OnInit } from '@angular/core';
import { ConnectionDetails } from 'src/app/model/connectionDetails';
import { JobOffer } from 'src/app/model/jobOffer';
import { Post } from 'src/app/model/post';
import { Profile } from 'src/app/model/profileModel';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
})
export class ProfilePictureComponent implements OnInit {
  @Input() user: Profile = new Profile();
  @Input() jobOffer: JobOffer = new JobOffer();
  @Input() size: number = 50;
  @Input() activeUser: boolean = false;
  @Input() connection: ConnectionDetails = new ConnectionDetails();
  @Input() post: Post = new Post();
  @Input() fullName: string = 'Null';

  constructor(
    private profileService: ProfileService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    if (this.activeUser) {
      this.fullName = this.loginService.getCurrentUser().fullName;
      if (this.fullName == null) {
        this.fullName = 'Null';
      }
    } else if (this.user.id != '') {
      this.fullName = this.profileService.getFullName(this.user);
    } else if (this.connection.UserID != '') {
      this.fullName = this.connection.Name + ' ' + this.connection.Surname;
    } else if (this.post.owner.name != '') {
      this.fullName = this.post.owner.name + ' ' + this.post.owner.surname;
    } else if (this.jobOffer.companyName != '') {
      this.fullName = this.jobOffer.companyName;
    }
  }
}
