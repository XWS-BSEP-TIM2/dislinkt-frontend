import { Component, Input, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/model/jobOffer';

@Component({
  selector: 'single-job-offer',
  templateUrl: './single-job-offer.component.html',
  styleUrls: ['./single-job-offer.component.scss'],
})
export class SingleJobOfferComponent implements OnInit {
  @Input() offer: JobOffer = new JobOffer();

  constructor() {}

  ngOnInit(): void {}

  redirect() {
    window.location.href = '/job-offer/' + this.offer.id;
  }
}
