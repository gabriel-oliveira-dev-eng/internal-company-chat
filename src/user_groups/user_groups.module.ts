import { Module } from '@nestjs/common';
import { UserGroupsService } from './user_groups.service';
import { UserGroupsController } from './user_groups.controller';

@Module({
  controllers: [UserGroupsController],
  providers: [UserGroupsService],
})
export class UserGroupsModule {}
