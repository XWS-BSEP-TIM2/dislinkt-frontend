import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/model/jobOffer';
import { JobOfferService } from 'src/app/services/job-offer.service';

@Component({
  selector: 'job-offers-page',
  templateUrl: './job-offers-page.component.html',
  styleUrls: ['./job-offers-page.component.scss'],
})
export class JobOffersPageComponent implements OnInit {
  offers: JobOffer[] = [];
  constructor(private jobOfferService: JobOfferService) {}

  ngOnInit(): void {
    this.jobOfferService.getRecommendetJobOffers().subscribe((data) => {
      this.offers = data.jobOffers;
    });
  }
}
