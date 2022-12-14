import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Appointment } from './schemas';
import { AppointmentRepository } from './appointment.repository';
import { DateTime } from 'luxon';
import { PerformerService } from '../performer/performer.service';
import AppointmentsHelper from '../helpers/AppointmentsHelper';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly performerService: PerformerService,
  ) {}

  async bookAppointment(payload): Promise<Appointment> {
    return this.appointmentRepository.create({
      ...payload,
      id: randomUUID(),
    });
  }

  async updateAppointment(id: string, payload): Promise<Appointment> {
    return this.appointmentRepository.findOneAndUpdate({ id }, payload);
  }

  async getAppointments(): Promise<Appointment[]> {
    return this.appointmentRepository.find({});
  }

  async cancelAppointment(id: string): Promise<Appointment> {
    return this.appointmentRepository.findOneAndUpdate(
      { id },
      { isCancelled: true },
    );
  }

  async getAppointmentsByStartDate(startTime: Date): Promise<Appointment[]> {
    return this.appointmentRepository.find({ startTime });
  }

  async getBookedTimeSlots(
    performerId: string,
    date: Date,
  ): Promise<{ startTime; endTime }[]> {
    const timeslots = [];

    const start = DateTime.fromJSDate(date).startOf('day').toISO();
    const end = DateTime.fromJSDate(date).endOf('day').toISO();

    const appointments = await this.appointmentRepository.find({
      'performer.id': performerId,
      date: { $gte: start, $lt: end },
    });

    if (!appointments.length) {
      return [];
    }

    appointments.forEach((appointment) => {
      let startTime = DateTime.fromJSDate(appointment.startTime);
      const endTime = DateTime.fromJSDate(appointment.endTime);

      while (startTime <= endTime) {
        timeslots.push({
          startTime: startTime.toISO(),
          endTime: startTime.plus({ minutes: 30 }).toISO(),
        });

        startTime = startTime.plus({ minutes: 30 });
      }
    });

    return timeslots;
  }

  async getAvailableAppointmentsByPerformer(
    performerId: string,
    date: string,
  ): Promise<{ startTime; endTime }[]> {
    const performer = await this.performerService.getPerformerById(performerId);

    if (!performer) {
      throw new BadRequestException('Invalid performer');
    }

    const bookedTimeSlots = await this.getBookedTimeSlots(
      performer.id,
      new Date(date),
    );

    const generatedTimeSlots = AppointmentsHelper.generateAppointmentTimeSlots(
      new Date(date),
      30,
    );

    console.log({
      bookedTimeSlots,
      generatedTimeSlots,
    });

    return generatedTimeSlots.filter((generatedTimeSlot) => {
      return !bookedTimeSlots.some(
        (bookedTimeSlot) =>
          bookedTimeSlot.startTime === generatedTimeSlot.startTime &&
          bookedTimeSlot.endTime === generatedTimeSlot.endTime,
      );
    });
  }
}
