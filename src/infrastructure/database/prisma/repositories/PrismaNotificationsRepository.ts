import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notifications';
import { NotificationsRepository } from '@application/repositories/notificationRepository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prismaNotificationMapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  findById(notificationId: string): Promise<Notification | null> {
    throw new Error('Method not implemented.');
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }

  save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
