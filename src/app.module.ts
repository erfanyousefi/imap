import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ImapModule } from './modules/imap/Imap.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './modules/user/user.module';
import { StudentModule } from './modules/student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), `.env`),
    }),
    TypeOrmModule.forRoot(TypeORMConfig()),
    ScheduleModule.forRoot(),
    ImapModule,
    UserModule,
    StudentModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
