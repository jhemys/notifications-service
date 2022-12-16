import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notifications';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'test',
    recipientId: 'recipientId',
    content: new Content('Content'),
    ...override,
  });
}
