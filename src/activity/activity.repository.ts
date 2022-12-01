import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Activity, ActivityDocument } from './schemas';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ActivityRepository {
  constructor(
    @InjectModel(Activity.name)
    private activityModel: Model<ActivityDocument>,
  ) {}

  async findOne(filterQuery: FilterQuery<Activity>): Promise<Activity> {
    return this.activityModel.findOne(filterQuery);
  }

  async find(filterQuery: FilterQuery<Activity>): Promise<Activity[]> {
    return this.activityModel.find(filterQuery);
  }

  async create(activity: Activity): Promise<Activity> {
    return this.activityModel.create(activity);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<Activity>,
    activity: Partial<Activity>,
  ): Promise<Activity> {
    return this.activityModel.findOneAndUpdate(filterQuery, activity);
  }
}
