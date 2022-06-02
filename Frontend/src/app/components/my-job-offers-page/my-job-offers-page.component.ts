import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobOffer } from 'src/app/model/jobOffer';
import { Profile } from 'src/app/model/profileModel';
import { LoginService } from 'src/app/services/login.service';
import { EditJobOfferDialogComponent } from './edit-job-offer-dialog/edit-job-offer-dialog.component';
import { NewJobOfferDialogComponent } from './new-job-offer-dialog/new-job-offer-dialog.component';

@Component({
  selector: 'my-job-offers-page',
  templateUrl: './my-job-offers-page.component.html',
  styleUrls: ['./my-job-offers-page.component.scss'],
})
export class MyJobOffersPageComponent implements OnInit {
  user: Profile = new Profile();
  //company: Company = new Company();
  jobOffers: JobOffer[] = [];

  constructor(private loginService: LoginService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.user.id = this.loginService.getCurrentUser().userID;
    /*
    this.browseService.getUserById(this.user.id).subscribe((data) => {
      this.user = data;

      this.browseService.getCompanyByUserId(this.user.id).subscribe((data) => {
        if (data != null) {
          this.company = data;

          if (this.user.role == 'COMPANY_OWNER') {
            this.browseService
              .getAllJobOffersByCompany(this.company.id)
              .subscribe((data) => {
                data.reverse();
                this.jobOffers = data;
              });
          }
        }
      });
    });
    */
  }

  addNew() {
    const dialogRef = this.dialog.open(NewJobOfferDialogComponent);
  }

  editJobOffer(id: string) {
    const dialogRef = this.dialog.open(EditJobOfferDialogComponent, {
      data: id,
    });
  }

  deleteJobOffer(offer: JobOffer) {
    if (
      confirm(
        'Are you sure you want to delete job offer for: ' +
          offer.position +
          '? It cannot be undone.'
      )
    ) {
      /*
      this.jobOfferService.deleteOffer(offer).subscribe((data) => {
        if (data) {
          window.location.href = '/job-offers';
        }
      });
      */
    }
  }
}
