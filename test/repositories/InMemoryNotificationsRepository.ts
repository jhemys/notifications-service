import { Notification } from 'src/application/entities/notifications';
import { NotificationsRepository } from 'src/application/repositories/notificationRepository';

export class InMemoryNotificationRepository implements NotificationsRepository {
  notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
