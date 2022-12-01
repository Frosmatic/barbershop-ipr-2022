import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { AppointmentModule } from '../appointment/appointment.module';

@Module({
  providers: [CronService],
  imports: [AppointmentModule],
})
export class CronModule {}
