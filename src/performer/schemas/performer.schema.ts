import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PerformerDocument = HydratedDocument<Performer>;

@Schema()
export class Performer {
  @Prop()
  @ApiProperty()
  id: string;

  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  email: string;
}

export const PerformerSchema = SchemaFactory.createForClass(Performer);
