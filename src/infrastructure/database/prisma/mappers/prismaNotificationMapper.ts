import { Notification } from '@application/entities/notifications';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      createdAt: notification.createdAt,
    };
  }
}
