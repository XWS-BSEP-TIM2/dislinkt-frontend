import { Component, Input, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/model/jobOffer';

@Component({
  selector: 'detailed-job-offer',
  templateUrl: './detailed-job-offer.component.html',
  styleUrls: ['./detailed-job-offer.component.scss'],
})
export class DetailedJobOfferComponent implements OnInit {
  @Input() offer: JobOffer = new JobOffer();

  constructor() {}

  ngOnInit(): void {}

  redirect() {
    window.location.href = '/job-offer/' + this.offer.userId;
  }

  redirectContact() {
    window.location.href = '/profile/' + this.offer.userId;
  }
}
