import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationsRepository';
import { ReadNotification } from './readNotificationUseCase';
import { NotificationNotFound } from './errors/NotificationNotFoundError';

describe('Read Notification', () => {
  it('should be able to Read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to Read a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(() =>
      readNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
