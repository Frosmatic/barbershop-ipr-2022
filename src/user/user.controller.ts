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
import { JwtGuard } from '../auth/guard';
import { HasRoles } from '../auth/decorator';
import { Role } from '../constants';
import { RolesGuard } from '../auth/guard/roles.guard';
import { UserService } from './user.service';
import * as argon from 'argon2';
import { AuthDto } from '../auth/dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './schemas';

@ApiTags('Users')
@HasRoles(Role.Admin)
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @UseInterceptors(CacheInterceptor)
  @ApiOkResponse({ type: [User] })
  async getList() {
    return this.userService.getUsers();
  }

  @Post('')
  @ApiCreatedResponse({ type: User })
  async create(@Body() dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    return this.userService.createUser(dto.email, hash);
  }

  @Put(':id')
  @ApiOkResponse({ type: User })
  update(@Param('id') id: string, email: string) {
    return this.userService.updateUser(id, { email });
  }
}
