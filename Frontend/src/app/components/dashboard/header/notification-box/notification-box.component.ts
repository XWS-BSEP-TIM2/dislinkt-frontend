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
    this.getNotificationsSilent();

    setInterval(() => {
      this.refresh();
    }, 5000);
  }

  async refresh() {
    this.getNotificationsWithSound();
  }

  getNotificationsWithSound() {
    let oldUnread = this.unreadNotifications;
    this.notificationService.getNotifications().subscribe((data) => {
      if (data != undefined) {
        if (data.notifications != undefined) {
          this.userNotifications = data.notifications;
        }
        this.userNotifications = this.userNotifications.sort(
          (a, b) => b.date.seconds - a.date.seconds
        );

        this.unreadNotifications = this.userNotifications.filter(
          (n) => !n.seen
        ).length;

        if (this.unreadNotifications > oldUnread) {
          let audio = new Audio();
          audio.src = '../../../../assets/notification.wav';
          audio.load();
          audio.play();
        }
      }
    });
  }

  getNotificationsSilent() {
    this.notificationService.getNotifications().subscribe((data) => {
      if (data != undefined) {
        if (data.notifications != undefined) {
          this.userNotifications = data.notifications;
        }
        this.userNotifications = this.userNotifications.sort(
          (a, b) => b.date.seconds - a.date.seconds
        );

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
          this.getNotificationsWithSound();
        }, 2000);
      });
    }
  }
}
