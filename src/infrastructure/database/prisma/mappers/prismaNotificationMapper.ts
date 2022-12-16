import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@application/entities/notifications';
import { Content } from '@application/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        recipientId: raw.recipientId,
        content: new Content(raw.content),
        category: raw.category,
        readAt: raw.readAt,
        createdAt: raw.createdAt,
        canceledAt: raw.canceledAt,
      },
      raw.id,
    );
  }
}
