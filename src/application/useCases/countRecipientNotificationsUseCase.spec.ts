import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationsRepository';
import { CountRecipientNotifications } from './countRecipientsNotificationsUseCase';

describe('Count Recipient Notification', () => {
  it('should be able to Count Recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotifications(
      notificationsRepository,
    );

    const notification = makeNotification();

    notificationsRepository.create(notification);
    notificationsRepository.create(notification);

    const notificationOtherRecipient = makeNotification({
      recipientId: 'recipientId2',
    });

    notificationsRepository.create(notificationOtherRecipient);

    const { count } = await countRecipientNotification.execute({
      recipientId: notification.recipientId,
    });

    expect(count).toBe(2);
  });
});
