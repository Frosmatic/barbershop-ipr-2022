import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './schemas';
import { ActivityService } from './activity.service';
import { ActivityRepository } from './activity.repository';
import { ActivityController } from './activity.controller';

@Module({
  controllers: [ActivityController],
  imports: [
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
    ]),
  ],
  providers: [ActivityService, ActivityRepository],
  exports: [ActivityService],
})
export class ActivityModule {}
