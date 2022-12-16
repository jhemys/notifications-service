import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notifications';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationsRepository';
import { CancelNotification } from './CancelNotificationUseCase';
import { NotificationNotFound } from './errors/NotificationNotFoundError';

describe('Cancel Notification', () => {
  it('should be able to Cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      category: 'test',
      recipientId: 'recipientId',
      content: new Content('Content'),
    });

    notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to Cancel a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() =>
      cancelNotification.execute({
        notificationId: 'fake-id-notification',
      }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
