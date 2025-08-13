import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GroupsModule } from './groups/groups.module';
import { UserStatusModule } from './user_status/user_status.module';
import { UserGroupsModule } from './user_groups/user_groups.module';
import { LogsModule } from './logs/logs.module';
import { FileModule } from './file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    FileModule,
    LogsModule,
    UserGroupsModule,
    UserStatusModule,
    GroupsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
