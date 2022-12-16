import { InMemoryNotificationRepository } from '../../../test/repositories/InMemoryNotificationsRepository';
import { SendNotification } from './sendNotificationUseCase';

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      content: 'Content',
      category: 'category',
      recipientId: 'recipientId',
    });

    expect(notificationsRepository.notifications[0]).toBe(notification);
    expect(notificationsRepository.notifications).toHaveLength(1);
  });
});
