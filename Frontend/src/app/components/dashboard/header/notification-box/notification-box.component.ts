import { Component, OnInit } from '@angular/core';
import { NotificationModel } from 'src/app/model/notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'notification-box',
  templateUrl: './notification-box.component.html',
  styleUrls: ['./notification-box.component.scss'],
})
export class NotificationBoxComponent implements OnInit {
  userNotifications: NotificationModel[] = [];
  unreadNotifications: number = 0;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    this.notificationService.getNotifications().subscribe((data) => {
      console.log(data);
      if (data != undefined) {
        this.userNotifications = data.notifications;

        this.unreadNotifications = this.userNotifications.filter(
          (n) => !n.seen
        ).length;
      }
    });
  }

  readNotifications() {
    if (this.unreadNotifications > 0) {
      this.notificationService.readNotifications().subscribe((data) => {
        this.unreadNotifications = 0;
        setTimeout(() => {
          this.getNotifications();
        }, 2000);
      });
    }
  }
}
