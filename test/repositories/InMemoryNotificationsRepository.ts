import { Notification } from '@application/entities/notifications';
import { NotificationsRepository } from '@application/repositories/notificationRepository';

export class InMemoryNotificationRepository implements NotificationsRepository {
  notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification) {
      return null;
    } else {
      return notification;
    }
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter((item) => item.recipientId === recipientId)
      .length;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (item) => item.recipientId === recipientId,
    );
  }

  async findManyByRecipientIdAndReadStatus(
    recipientId: string,
    includeRetrieved: boolean,
  ): Promise<Notification[]> {
    return this.notifications.filter((item) => {
      return (
        item.recipientId === recipientId &&
        (includeRetrieved || (!includeRetrieved && !item.readAt))
      );
    });
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[0] = notification;
    }
  }
}
