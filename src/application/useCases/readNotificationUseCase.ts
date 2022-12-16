import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notificationRepository';
import { NotificationNotFound } from './errors/NotificationNotFoundError';

interface ReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    this.notificationsRepository.save(notification);
  }
}
