import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'suggested-connections',
  templateUrl: './suggested-connections.component.html',
  styleUrls: ['./suggested-connections.component.scss'],
})
export class SuggestedConnectionsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  redirectConnections() {
    window.location.href = 'connections';
  }
}
