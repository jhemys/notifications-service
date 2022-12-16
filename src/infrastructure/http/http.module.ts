import { Module } from '@nestjs/common';
import { SendNotification } from '@application/useCases/sendNotificationUseCase';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controller/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
