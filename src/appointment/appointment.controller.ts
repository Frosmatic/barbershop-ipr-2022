import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser, HasRoles } from '../auth/decorator';
import { Role } from '../constants';
import { RolesGuard } from '../auth/guard';
import { AppointmentService } from './appointment.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Appointment } from './schemas';
import { BookAppointmentDto } from './dto';
import { PerformerService } from '../performer/performer.service';
import { ActivityService } from '../activity/activity.service';
import { UserService } from '../user/user.service';
import { DateTime } from 'luxon';
import { AvailableAppointmentsDto } from './dto/available-appointments.dto';

@ApiTags('Appointments')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly performerService: PerformerService,
    private readonly activityService: ActivityService,
    private readonly userService: UserService,
  ) {}

  @HasRoles(Role.User)
  @Post('')
  @ApiCreatedResponse({ type: Appointment })
  async bookAppointment(@Body() dto: BookAppointmentDto, @GetUser() user) {
    const payload = { ...dto };

    const [performer, activity, currentUser] = await Promise.all([
      this.performerService.getPerformerById(payload.performerId),
      this.activityService.getActivityById(payload.activityId),
      this.userService.getUserById(user.userId),
    ]);

    if (!performer || !activity) {
      throw new BadRequestException('Invalid performer or activity');
    }

    const availableTimeSlots =
      await this.appointmentService.getAvailableAppointmentsByPerformer(
        payload.performerId,
        payload.date,
      );

    if (!availableTimeSlots.length) {
      throw new BadRequestException('No available time slots');
    }

    if (
      !availableTimeSlots.some((slot) => slot.startTime === payload.startTime)
    ) {
      throw new BadRequestException('Time slot is not available');
    }

    payload.endTime = DateTime.fromISO(payload.startTime)
      .plus({ minutes: activity.executionTime })
      .toISO();

    await this.appointmentService.checkAppointmentTimeAvailability(
      new Date(payload.startTime),
      new Date(payload.endTime),
      performer.id,
    );

    payload.performer = performer;
    payload.activity = activity;
    payload.user = currentUser;

    return this.appointmentService.bookAppointment(payload);
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

  @HasRoles(Role.User)
  @Get('/available')
  @ApiOkResponse({ type: [Appointment] })
  async getAvailableAppointments(@Query() query: AvailableAppointmentsDto) {
    return this.appointmentService.getAvailableAppointmentsByPerformer(
      query.performerId,
      query.date,
    );
  }
}
