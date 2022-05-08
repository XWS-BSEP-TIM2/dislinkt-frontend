import { Component, Input, OnInit } from '@angular/core';
import { ConnectionDetails } from 'src/app/model/connectionDetails';

@Component({
  selector: 'detailed-connection-suggestion',
  templateUrl: './detailed-connection-suggestion.component.html',
  styleUrls: ['./detailed-connection-suggestion.component.scss'],
})
export class DetailedConnectionSuggestionComponent implements OnInit {
  @Input() connectionDetails!: ConnectionDetails;

  constructor() {}

  ngOnInit(): void {}

  redirect() {
    window.location.href = '/user/'+this.connectionDetails.UserID;
  }
}
