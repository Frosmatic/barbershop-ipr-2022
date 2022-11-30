import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment, AppointmentDocument } from './schemas';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class AppointmentRepository {
  constructor(
    @InjectModel(Appointment.name)
    private performerModel: Model<AppointmentDocument>,
  ) {}

  async findOne(
    userFilterQuery: FilterQuery<Appointment>,
  ): Promise<Appointment> {
    return this.performerModel.findOne(userFilterQuery);
  }

  async find(
    userFilterQuery: FilterQuery<Appointment>,
  ): Promise<Appointment[]> {
    return this.performerModel.find(userFilterQuery);
  }

  async create(performer: Appointment): Promise<Appointment> {
    return this.performerModel.create(performer);
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<Appointment>,
    user: Partial<Appointment>,
  ): Promise<Appointment> {
    return this.performerModel.findOneAndUpdate(userFilterQuery, user);
  }
}
