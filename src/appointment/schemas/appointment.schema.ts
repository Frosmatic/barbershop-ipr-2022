import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User, UserSchema } from '../../user/schemas';
import { Type } from 'class-transformer';
import { Performer, PerformerSchema } from '../../performer/schemas';
import { Activity, ActivitySchema } from '../../activity/schemas';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema()
export class Appointment {
  @Prop()
  @ApiProperty()
  id: string;

  @Prop()
  @ApiProperty()
  date: Date;

  @Prop()
  @ApiProperty()
  startTime: Date;

  @Prop()
  @ApiProperty()
  endTime: Date;

  @Prop()
  @ApiProperty()
  isCancelled: boolean;

  @Prop({ type: UserSchema })
  @Type(() => User)
  user: User;

  @Prop({ type: PerformerSchema })
  @Type(() => Performer)
  performer: Performer;

  @Prop({ type: ActivitySchema })
  @Type(() => Activity)
  activity: Activity;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
