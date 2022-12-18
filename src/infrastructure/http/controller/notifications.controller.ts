import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/useCases/sendNotificationUseCase';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../viewModels/notificationViewModel';
import { CancelNotification } from '@application/useCases/CancelNotificationUseCase';
import { ReadNotification } from '@application/useCases/ReadNotificationUseCase';
import { UnreadNotification } from '@application/useCases/unreadNotificationUseCase';
import { CountRecipientNotifications } from '@application/useCases/countRecipientsNotificationsUseCase';
import { GetRecipientNotifications } from '@application/useCases/getRecipientNotificationsUseCase';
import { GetRecipientNotificationsByReadStatus } from '@application/useCases/getRecipientNotificationsByReadStatusUseCase';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
    private getRecipientNotificationsByReadStatus: GetRecipientNotificationsByReadStatus,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Get('from/:recipientId/retrieved/:includeRetrieved')
  async getFromRecipientByNotificationStatus(
    @Param('recipientId') recipientId: string,
    @Param('includeRetrieved') includeRetrieved: boolean,
  ) {
    const { notifications } =
      await this.getRecipientNotificationsByReadStatus.execute({
        recipientId,
        includeRetrieved,
      });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
    //todo: change promise to view model
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHttp(notification) };
  }
}
