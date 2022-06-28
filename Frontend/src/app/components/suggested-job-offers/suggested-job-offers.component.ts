import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/model/jobOffer';
import { JobOfferService } from 'src/app/services/job-offer.service';

@Component({
  selector: 'suggested-job-offers',
  templateUrl: './suggested-job-offers.component.html',
  styleUrls: ['./suggested-job-offers.component.scss'],
})
export class SuggestedJobOffersComponent implements OnInit {
  offers: JobOffer[] = [];

  constructor(private jobOfferService: JobOfferService) {}

  ngOnInit(): void {
    this.jobOfferService.getRecommendetJobOffers().subscribe((data) => {
      this.offers = data.jobOffers;
    });
  }

  redirectJobOffers() {
    window.location.href = 'job-offers';
  }
}
