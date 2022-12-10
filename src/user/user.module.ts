import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { AdminSeed } from './seeds/admin.seed';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserRepository, AdminSeed],
  exports: [UserService],
})
export class UserModule {}
