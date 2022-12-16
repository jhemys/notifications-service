import { Notification } from '@application/entities/notifications';

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
      createdAt: notification.createdAt,
    };
  }
}
