import { Component, Input, OnInit } from '@angular/core';
import { ConnectionDetails } from 'src/app/model/connectionDetails';

@Component({
  selector: 'single-connection-suggestion',
  templateUrl: './single-connection-suggestion.component.html',
  styleUrls: ['./single-connection-suggestion.component.scss'],
})
export class SingleConnectionSuggestionComponent implements OnInit {
  @Input() connectionDetails!: ConnectionDetails;

  constructor() {}

  ngOnInit(): void {}

  redirect() {
    window.location.href = '/user/' + this.connectionDetails.UserID;
  }
}
