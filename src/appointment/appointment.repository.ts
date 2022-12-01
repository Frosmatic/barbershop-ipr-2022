import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment, AppointmentDocument } from './schemas';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class AppointmentRepository {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
  ) {}

  async findOne(filterQuery: FilterQuery<Appointment>): Promise<Appointment> {
    return this.appointmentModel.findOne(filterQuery);
  }

  async find(filterQuery: FilterQuery<Appointment>): Promise<Appointment[]> {
    return this.appointmentModel.find(filterQuery);
  }

  async create(appointment: Appointment): Promise<Appointment> {
    return this.appointmentModel.create(appointment);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<Appointment>,
    appointment: Partial<Appointment>,
  ): Promise<Appointment> {
    return this.appointmentModel.findOneAndUpdate(filterQuery, appointment);
  }
}
