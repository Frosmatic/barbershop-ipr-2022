import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateActivityDto } from './dto';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { ActivityService } from './activity.service';
import { HasRoles } from '../auth/decorator';
import { Role } from '../constants';
import { Activity } from './schemas';

@ApiTags('Activities')
@HasRoles(Role.Admin)
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('')
  @UseInterceptors(CacheInterceptor)
  @ApiOkResponse({ type: [Activity] })
  async getList() {
    return this.activityService.getActivities();
  }

  @Post('')
  @ApiCreatedResponse({ type: Activity })
  create(@Body() dto: CreateActivityDto) {
    return this.activityService.createActivity(dto);
  }

  @Put('/:id')
  @ApiOkResponse({ type: Activity })
  update(@Body() dto: CreateActivityDto, @Param('id') id: string) {
    return this.activityService.updateActivity(id, dto);
  }
}
