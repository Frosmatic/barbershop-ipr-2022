import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Appointment } from './schemas';
import { AppointmentRepository } from './appointment.repository';

@Injectable()
export class AppointmentService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

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
}
