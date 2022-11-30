import { IsDate, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookAppointmentDto {
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  date: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  endTime: string;
}
