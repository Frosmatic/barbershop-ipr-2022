import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new NotFoundException('Credential incorrect');

    const isPasswordMatch = await argon.verify(user.hash, dto.password);

    if (!isPasswordMatch) throw new BadRequestException('Credential incorrect')

    delete user.hash;

    return user;
  }

  async signup(dto: AuthDto) {
    let createdUser;

    const hash = await argon.hash(dto.password);

    try {
      createdUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new BadRequestException('Email already taken');
      }

      throw e;
    }

    delete createdUser.hash;

    return createdUser;
  }
}
