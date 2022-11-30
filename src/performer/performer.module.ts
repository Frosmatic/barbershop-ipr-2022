import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Performer, PerformerSchema } from './schemas';
import { PerformerService } from './performer.service';
import { PerformerRepository } from './performer.repository';
import { PerformerController } from './performer.controller';

@Module({
  controllers: [PerformerController],
  imports: [
    MongooseModule.forFeature([
      { name: Performer.name, schema: PerformerSchema },
    ]),
  ],
  providers: [PerformerService, PerformerRepository],
  exports: [PerformerService],
})
export class PerformerModule {}
