import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Activity } from './schemas';
import { CreateActivityDto } from './dto';
import { ActivityRepository } from './activity.repository';

@Injectable()
export class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async createActivity(payload: CreateActivityDto): Promise<Activity> {
    return this.activityRepository.create({
      ...payload,
      id: randomUUID(),
    });
  }

  async updateActivity(
    id: string,
    payload: CreateActivityDto,
  ): Promise<Activity> {
    return this.activityRepository.findOneAndUpdate({ id }, payload);
  }

  async getActivities(): Promise<Activity[]> {
    return this.activityRepository.find({});
  }

  async getActivityById(id: string): Promise<Activity> {
    return this.activityRepository.findOne({ id });
  }
}
