import { Notification } from '@application/entities/notifications';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notificationRepository';

interface GetRecipientNotificationsByReadStatusRequest {
  recipientId: string;
  includeRetrieved: boolean;
}

interface GetRecipientNotificationsByReadStatusResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotificationsByReadStatus {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: GetRecipientNotificationsByReadStatusRequest,
  ): Promise<GetRecipientNotificationsByReadStatusResponse> {
    const { recipientId, includeRetrieved } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientIdAndReadStatus(
        recipientId,
        includeRetrieved,
      );

    return {
      notifications,
    };
  }
}
