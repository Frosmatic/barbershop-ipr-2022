import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Activity } from '../../activity/schemas';
import { Performer } from '../../performer/schemas';
import { User } from '../../user/schemas';

export class BookAppointmentDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @IsDateString()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  performerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  activityId: string;

  activity: Activity;
  performer: Performer;
  user: User;
}
