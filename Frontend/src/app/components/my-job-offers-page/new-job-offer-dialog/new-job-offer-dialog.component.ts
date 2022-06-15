import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobOffer } from 'src/app/model/jobOffer';
import { Profile } from 'src/app/model/profileModel';
import { LoginService } from 'src/app/services/login.service';
import { JobOfferService } from '../../../services/job-offer.service';
import { SelectTechnologiesDialogComponent } from '../../select-technologies-dialog/select-technologies-dialog.component';

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

  constructor(
    private loginService: LoginService,
    private jobOfferService: JobOfferService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user.id = this.loginService.getCurrentUser().userID;
  }

  getTechnologyCount() {
    if (this.technologies != '') {
      return this.technologies.split(',').length;
    } else {
      return 0;
    }
  }

  openTechnologiesDialog() {
    const dialogRef = this.dialog.open(SelectTechnologiesDialogComponent, {
      data: { currentTechnologies: this.technologies },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.technologies = result;
    });
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
      this.offer.position = this.offer.position.trim();
      this.offer.seniority = this.offer.seniority.trim();
      this.offer.description = this.offer.description.trim();
      this.offer.companyName = this.offer.companyName.trim();
      this.offer.userId = this.user.id;
      this.offer.technologies = this.technologies
        .split(',')
        .map((e) => e.trim());

      this.jobOfferService.createJobOffer(this.offer).subscribe(
        (data) => {
          if (data) {
            alert('Your job offer has been published!');
            window.location.href = '/job-offers';
          }
        },
        (error) => {
          alert(error);
        }
      );
    }
  }
}
