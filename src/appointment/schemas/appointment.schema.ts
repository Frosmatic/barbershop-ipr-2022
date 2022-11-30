import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

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
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
