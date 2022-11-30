import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { HasRoles } from '../auth/decorator';
import { Role } from '../constants';
import { RolesGuard } from '../auth/guard/roles.guard';
import { AppointmentService } from './appointment.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Appointment } from './schemas';
import { BookAppointmentDto } from './dto';

@ApiTags('Appointments')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @HasRoles(Role.User)
  @Post('')
  @ApiCreatedResponse({ type: Appointment })
  bookAppointment(@Body() dto: BookAppointmentDto) {
    return this.appointmentService.bookAppointment({
      ...dto,
      date: '2021-01-01',
      startTime: '2021-01-01T10:00:00.000Z',
      endTime: '2021-01-01T11:00:00.000Z',
    });
  }

  @HasRoles(Role.Admin)
  @Put('/:id')
  @ApiOkResponse({ type: Appointment })
  update(@Body() dto, @Param('id') id: string) {
    return this.appointmentService.updateAppointment(id, dto);
  }

  @HasRoles(Role.Admin)
  @Get('')
  @ApiOkResponse({ type: [Appointment] })
  getList() {
    return this.appointmentService.getAppointments();
  }

  @HasRoles(Role.Admin)
  @Put('/:id/is-cancelled')
  @ApiOkResponse({ type: Appointment })
  cancelAppointment(@Param('id') id: string) {
    return this.appointmentService.cancelAppointment(id);
  }
}
