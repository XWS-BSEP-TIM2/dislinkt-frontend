import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.scss']
})
export class NotAuthorizedComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  goBack(){
    this.route.navigateByUrl('/login');
  }

}
