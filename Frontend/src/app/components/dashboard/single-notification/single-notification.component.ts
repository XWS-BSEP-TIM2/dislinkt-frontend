import { Component, Input, OnInit } from '@angular/core';
import { NotificationModel } from 'src/app/model/notification';

@Component({
  selector: 'single-notification',
  templateUrl: './single-notification.component.html',
  styleUrls: ['./single-notification.component.scss'],
})
export class SingleNotificationComponent implements OnInit {
  @Input() notification: NotificationModel = new NotificationModel();

  constructor() {}

  ngOnInit(): void {
    this.notification.dateDisplay = this.getDateFromSeconds(
      this.notification.date.seconds
    );
  }

  getDateFromSeconds(seconds: number): Date {
    var date = new Date(1970, 0, 1); // Epoch
    date.setSeconds(seconds);
    return date;
  }

  redirect() {
    window.location.href = this.notification.forwardUrl;
  }
}
