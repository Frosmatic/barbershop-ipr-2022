import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PerformerService } from './performer.service';
import { CreatePerformerDto } from './dto';
import { JwtGuard } from '../auth/guard';
import { HasRoles } from '../auth/decorator';
import { Role } from '../constants';
import { RolesGuard } from '../auth/guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Performer } from './schemas';

@ApiTags('Performers')
@HasRoles(Role.Admin)
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Controller('performers')
export class PerformerController {
  constructor(private readonly performerService: PerformerService) {}

  @Post('')
  @ApiCreatedResponse({ type: Performer })
  create(@Body() dto: CreatePerformerDto) {
    const existingPerformer = this.performerService.getPerformerByEmail(
      dto.email,
    );

    if (existingPerformer) {
      throw new BadRequestException('Performer already exists');
    }

    return this.performerService.createPerformer(dto);
  }

  @Put('/:id')
  @ApiOkResponse({ type: Performer })
  update(@Body() dto: CreatePerformerDto, @Param('id') id: string) {
    return this.performerService.updatePerformer(id, dto);
  }
}
