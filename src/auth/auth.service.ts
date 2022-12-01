import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { Role } from '../constants';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private userService: UserService,
  ) {}

  async signin(dto: AuthDto) {
    const user = await this.userService.getUserByEmail(dto.email);

    if (!user) throw new BadRequestException('Credential incorrect');

    const isPasswordMatch = await argon.verify(user.hash, dto.password);

    if (!isPasswordMatch) throw new BadRequestException('Credential incorrect');

    return await this.signToken(user.id, user.email, user.roles);
  }

  async signup(dto: AuthDto) {
    let createdUser;

    try {
      createdUser = await this.userService.createUser(dto.email, dto.password);
    } catch (e) {
      throw e;
    }

    return await this.signToken(
      createdUser.id,
      createdUser.email,
      createdUser.roles,
    );
  }

  async signToken(userId: string, email: string, roles: Role[]) {
    const payload = {
      sub: userId,
      email,
      roles,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
