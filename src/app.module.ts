import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GroupsModule } from './groups/groups.module';
import { UserStatusModule } from './user_status/user_status.module';
import { UserGroupsModule } from './user_groups/user_groups.module';
import { LogsModule } from './logs/logs.module';
import { FileModule } from './file/file.module';
import { UserModule } from './file/user/user.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, FileModule, LogsModule, UserGroupsModule, UserStatusModule, GroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
