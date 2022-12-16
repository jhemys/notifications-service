import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationsRepository';
import { GetRecipientNotifications } from './getRecipientNotificationsUseCase';

describe('Get Recipient Notification', () => {
  it('should be able to GetRecipient a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const getRecipientNotification = new GetRecipientNotifications(
      notificationsRepository,
    );

    const notification = makeNotification();

    notificationsRepository.create(notification);
    notificationsRepository.create(notification);

    const { notifications } = await getRecipientNotification.execute({
      recipientId: notification.recipientId,
    });

    expect(notifications.length).toBe(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipientId' }),
        expect.objectContaining({ recipientId: 'recipientId' }),
      ]),
    );
  });
});
