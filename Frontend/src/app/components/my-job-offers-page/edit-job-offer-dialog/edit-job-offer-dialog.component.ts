import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobOffer } from 'src/app/model/jobOffer';
import { JobOfferService } from '../../../services/job-offer.service';
import { SelectTechnologiesDialogComponent } from '../../select-technologies-dialog/select-technologies-dialog.component';

@Component({
  selector: 'edit-job-offer-dialog',
  templateUrl: './edit-job-offer-dialog.component.html',
  styleUrls: ['./edit-job-offer-dialog.component.scss'],
})
export class EditJobOfferDialogComponent implements OnInit {
  offer: JobOffer = new JobOffer();
  technologies: string = '';

  constructor(
    public dialog: MatDialog,
    private jobOfferService: JobOfferService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.jobOfferService.getJobOffer(this.data).subscribe((data) => {
      this.offer = data.jobOffer;
      this.technologies = this.offer.technologies.toString();
    });
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
      this.offer.id = this.data;
      this.offer.position = this.offer.position.trim();
      this.offer.seniority = this.offer.seniority.trim();
      this.offer.description = this.offer.description.trim();
      this.offer.companyName = this.offer.companyName.trim();
      this.offer.technologies = this.technologies
        .split(',')
        .map((e) => e.trim());

      this.jobOfferService.editOffer(this.offer).subscribe(
        (data) => {
          if (data) {
            alert('Your job offer has been changed!');
            window.location.href = '/job-offers';
          }
        },
        (error) => {}
      );
    }
  }
}
