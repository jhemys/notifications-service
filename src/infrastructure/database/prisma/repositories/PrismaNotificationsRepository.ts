import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../application/entities/notifications';
import { NotificationsRepository } from '../../../../application/repositories/notificationRepository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        recipientId: notification.recipientId,
        content: notification.content.value,
        category: notification.category,
        createdAt: notification.createdAt,
      },
    });
  }
}
