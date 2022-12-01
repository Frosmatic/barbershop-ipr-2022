import { CacheModule, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PerformerModule } from './performer/performer.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ActivityModule } from './activity/activity.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    PerformerModule,
    AppointmentModule,
    CacheModule.register({
      isGlobal: true,
    }),
    ActivityModule,
    ScheduleModule.forRoot(),
    CronModule,
  ],
})
export class AppModule {}
