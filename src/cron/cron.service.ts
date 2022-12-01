import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AppointmentService } from '../appointment/appointment.service';
import { DateTime } from 'luxon';
import mongoose from 'mongoose';
mongoose.set('debug', true);
@Injectable()
export class CronService {
  constructor(private readonly appointmentService: AppointmentService) {}

  private readonly logger = new Logger(CronService.name);

  @Cron('0 */15 * * * *')
  async appointmentReminder() {
    const appointmentsStartDate = DateTime.now()
      .plus({ hour: 1 })
      .startOf('minute')
      .toUTC()
      .toJSDate();

    const appointments =
      await this.appointmentService.getAppointmentsByStartDate(
        appointmentsStartDate,
      );

    this.logger.debug(
      `Appointment reminder for ${appointments.length} appointments. Start date - ${appointmentsStartDate}`,
    );

    if (!appointments.length) return;

    //TODO
    // Send email to user
  }
}
