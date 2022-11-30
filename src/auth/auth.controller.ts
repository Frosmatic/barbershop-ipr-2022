import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AccessToken } from './schemas';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({ type: AccessToken })
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @ApiCreatedResponse({ type: AccessToken })
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
