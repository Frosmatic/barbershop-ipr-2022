import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Performer, PerformerDocument } from './schemas';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class PerformerRepository {
  constructor(
    @InjectModel(Performer.name)
    private performerModel: Model<PerformerDocument>,
  ) {}

  async findOne(userFilterQuery: FilterQuery<Performer>): Promise<Performer> {
    return this.performerModel.findOne(userFilterQuery);
  }

  async find(userFilterQuery: FilterQuery<Performer>): Promise<Performer[]> {
    return this.performerModel.find(userFilterQuery);
  }

  async create(performer: Performer): Promise<Performer> {
    return this.performerModel.create(performer);
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<Performer>,
    user: Partial<Performer>,
  ): Promise<Performer> {
    return this.performerModel.findOneAndUpdate(userFilterQuery, user);
  }
}
