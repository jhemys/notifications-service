import { Module } from '@nestjs/common';
import { SendNotification } from '@application/useCases/sendNotificationUseCase';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controller/notifications.controller';
import { CancelNotification } from '@application/useCases/CancelNotificationUseCase';
import { CountRecipientNotifications } from '@application/useCases/countRecipientsNotificationsUseCase';
import { GetRecipientNotifications } from '@application/useCases/getRecipientNotificationsUseCase';
import { ReadNotification } from '@application/useCases/ReadNotificationUseCase';
import { UnreadNotification } from '@application/useCases/unreadNotificationUseCase';
import { GetRecipientNotificationsByReadStatus } from '@application/useCases/getRecipientNotificationsByReadStatusUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    GetRecipientNotificationsByReadStatus,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
