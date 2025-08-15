import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGroupsService } from './user_groups.service';
import { UserGroupsController } from './user_groups.controller';
import { UserGroup } from './entities/user_group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserGroup]),
  ],
  controllers: [UserGroupsController],
  providers: [UserGroupsService],
})
export class UserGroupsModule {}
