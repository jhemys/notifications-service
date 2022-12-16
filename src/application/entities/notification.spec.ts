import { Content } from './content';
import { Notification } from './notifications';

describe('Notification', () => {
  it('should be able to create a notification without createdAt value', () => {
    const content = new Notification({
      content: new Content('Content'),
      category: 'category',
      recipientId: 'recipientId',
    });

    const currentDate = new Date();
    expect(content).toBeTruthy();
    expect(content.createdAt.getDay()).toBe(currentDate.getDay());
    expect(content.createdAt.getMonth()).toBe(currentDate.getMonth());
    expect(content.createdAt.getFullYear()).toBe(currentDate.getFullYear());
  });

  it('should be able to create a notification with createdAt value', () => {
    const content = new Notification({
      content: new Content('Content'),
      category: 'category',
      recipientId: 'recipientId',
      createdAt: new Date(2020, 1, 1),
    });

    expect(content).toBeTruthy();
    expect(content.createdAt.getDate()).toBe(1);
    expect(content.createdAt.getMonth()).toBe(1);
    expect(content.createdAt.getFullYear()).toBe(2020);
  });
});
