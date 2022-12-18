import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationRepository } from '@test/repositories/InMemoryNotificationsRepository';
import { GetRecipientNotificationsByReadStatus } from './getRecipientNotificationsByReadStatusUseCase';

describe('Get Recipient Notification By Read Status', () => {
  it('should be able to GetRecipient notifications even if they are read', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const getRecipientNotification = new GetRecipientNotificationsByReadStatus(
      notificationsRepository,
    );

    const unreadNotification = makeNotification();
    const readNotification = makeNotification({ readAt: new Date() });

    notificationsRepository.create(unreadNotification);
    notificationsRepository.create(readNotification);

    const { notifications } = await getRecipientNotification.execute({
      recipientId: unreadNotification.recipientId,
      includeRetrieved: true,
    });

    expect(notifications.length).toBe(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: 'recipientId',
          readAt: undefined,
        }),
        expect.objectContaining({
          recipientId: 'recipientId',
          readAt: expect.any(Date),
        }),
      ]),
    );
  });

  it('should be able to GetRecipient notifications even if they are read', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const getRecipientNotification = new GetRecipientNotificationsByReadStatus(
      notificationsRepository,
    );

    const unreadNotification = makeNotification();
    const readNotification = makeNotification({ readAt: new Date() });

    notificationsRepository.create(unreadNotification);
    notificationsRepository.create(readNotification);

    const { notifications } = await getRecipientNotification.execute({
      recipientId: unreadNotification.recipientId,
      includeRetrieved: false,
    });

    expect(notifications.length).toBe(1);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId: 'recipientId',
          readAt: undefined,
        }),
      ]),
    );
  });
});
