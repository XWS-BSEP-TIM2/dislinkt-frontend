import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'suggested-job-offers',
  templateUrl: './suggested-job-offers.component.html',
  styleUrls: ['./suggested-job-offers.component.scss'],
})
export class SuggestedJobOffersComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  redirectJobOffers() {
    window.location.href = 'job-offers';
  }
}
