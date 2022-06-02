import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/model/jobOffer';
import { Profile } from 'src/app/model/profileModel';
import { LoginService } from 'src/app/services/login.service';
import { JobOfferService } from '../../../services/job-offer.service';

@Component({
  selector: 'new-job-offer-dialog',
  templateUrl: './new-job-offer-dialog.component.html',
  styleUrls: ['./new-job-offer-dialog.component.scss'],
})
export class NewJobOfferDialogComponent implements OnInit {
  offer: JobOffer = new JobOffer();
  user: Profile = new Profile();
  technologies: string = '';
  publishToDislinkt: boolean = false;

  constructor(private loginService: LoginService,private jobOfferService:JobOfferService) {}

  ngOnInit(): void {
    this.user.id = this.loginService.getCurrentUser().userID;
  }

  validForm() {
    return (
      this.offer.description.trim() != '' &&
      this.offer.position.trim() != '' &&
      this.offer.seniority.trim() != '' &&
      this.technologies.trim() != '' &&
      this.offer.companyName.trim() != ''
    );
  }

  send() {
    console.log("Try to send");
    if (this.validForm()) {
      this.offer.position = this.offer.position.trim();
      this.offer.seniority = this.offer.seniority.trim();
      this.offer.description = this.offer.description.trim();
      this.offer.companyName = this.offer.companyName.trim();
      this.offer.userId = this.user.id;
      this.offer.technologies = this.technologies
        .split(',')
        .map((e) => e.trim());

      
      this.jobOfferService.createJobOffer(this.offer).subscribe((data) => {
        if (data) {
          alert('Your job offer has been published!');
          window.location.href = '/job-offers';
        }
      },
      error=>{
        alert(error);
      });

      
    }
  }
}
