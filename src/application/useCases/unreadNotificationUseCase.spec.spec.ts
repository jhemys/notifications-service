import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationsRepository';
import { UnreadNotification } from './unreadNotificationUseCase';
import { NotificationNotFound } from './errors/NotificationNotFoundError';

describe('Unread Notification', () => {
  it('should be able to Unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({ readAt: new Date() });

    notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to Unread a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    expect(() =>
      unreadNotification.execute({
        notificationId: 'fake-notification-id',
      }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
