import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobOffer } from 'src/app/model/jobOffer';
import { JobOfferService } from '../../../services/job-offer.service';

@Component({
  selector: 'edit-job-offer-dialog',
  templateUrl: './edit-job-offer-dialog.component.html',
  styleUrls: ['./edit-job-offer-dialog.component.scss']
})
export class EditJobOfferDialogComponent implements OnInit {
  offer: JobOffer = new JobOffer();
  technologies: string = '';

  constructor(private jobOfferService: JobOfferService,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    /*
    this.browseService.getUserById(this.user.id).subscribe((data) => {
      this.user = data;
    });

    */
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
    if (this.validForm()) {
      this.offer.id=this.data;
      this.offer.position = this.offer.position.trim();
      this.offer.seniority = this.offer.seniority.trim();
      this.offer.description = this.offer.description.trim();
      this.offer.companyName = this.offer.companyName.trim();
      this.offer.technologies = this.technologies
        .split(',')
        .map((e) => e.trim());


      this.jobOfferService.editOffer(this.offer).subscribe((data) => {
        if (data) {
          alert('Your job offer has been changed!');
          window.location.href = '/job-offers';
        }
      }, (error) => {
        console.log(error)
      });


    }
  }
}
