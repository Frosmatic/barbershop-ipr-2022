import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AccessToken } from './schemas';
import { UserService } from '../user/user.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  @ApiCreatedResponse({ type: AccessToken })
  async signup(@Body() dto: AuthDto) {
    const existUser = await this.userService.getUserByEmail(dto.email);

    if (existUser) {
      throw new BadRequestException('User already exists');
    }

    return this.authService.signup(dto);
  }

  @Post('signin')
  @ApiCreatedResponse({ type: AccessToken })
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
