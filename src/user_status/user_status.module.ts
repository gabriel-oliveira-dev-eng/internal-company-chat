import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatusService } from './user_status.service';
import { UserStatusController } from './user_status.controller';
import { UserStatus } from './entities/user_status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserStatus]),
  ],
  controllers: [UserStatusController],
  providers: [UserStatusService],
})
export class UserStatusModule {}
