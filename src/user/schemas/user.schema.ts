import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../constants';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  @ApiProperty()
  email: string;

  @Prop()
  hash: string;

  @Prop()
  @ApiProperty()
  roles: Role[];

  @Prop()
  @ApiProperty()
  id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
