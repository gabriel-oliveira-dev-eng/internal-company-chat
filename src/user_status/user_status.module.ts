import { Module } from '@nestjs/common';
import { UserStatusService } from './user_status.service';
import { UserStatusController } from './user_status.controller';

@Module({
  controllers: [UserStatusController],
  providers: [UserStatusService],
})
export class UserStatusModule {}
