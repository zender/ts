import {Component, OnInit} from '@angular/core';
import {NotificationService} from './shared/notification.service';
import {NotificationModel} from './shared/notification.model';
import {Collection} from '../shared/testbirds/shared/collection';

@Component({
  moduleId: module.id,
  selector: 'tb-notification-list',
  templateUrl: 'notification-list.component.html',
  styleUrls: ['notification-list.component.scss'],
  providers: [NotificationService],
})
export class NotificationListComponent implements OnInit {

  notifications: NotificationModel[] = [];

  currentPage: number = 1;

  nextPage: number = null;

  loading: boolean = true;

  constructor(protected notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications(this.currentPage);
  }

  loadNotifications(page: number = 1): boolean {
    this.notificationService.getNotifications(page).subscribe((collection: Collection<NotificationModel>) => {
      this.nextPage = collection.next;
      this.currentPage = collection.current;
      collection.data.forEach((notification: NotificationModel) => this.notifications.push(notification));
      this.loading = false;
    });

    return false;
  }
}
