import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobOffer } from 'src/app/model/jobOffer';
import { JobOfferService } from 'src/app/services/job-offer.service';

@Component({
  selector: 'job-offer-page',
  templateUrl: './job-offer-page.component.html',
  styleUrls: ['./job-offer-page.component.scss'],
})
export class JobOfferPageComponent implements OnInit {
  offer: JobOffer = new JobOffer();
  loaded: boolean = false;

  constructor(
    private jobOfferService: JobOfferService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.offer.id = this.route.snapshot.paramMap.get('id')!;

    this.jobOfferService.getJobOffer(this.offer.id).subscribe((data) => {
      this.offer = data.jobOffer;
      this.loaded = true;
    });
  }
}
