import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class AdminSeed {
  constructor(private readonly userService: UserService) {}

  @Command({
    command: 'create:admin',
    describe: 'create a admin',
  })
  async create() {
    const user = await this.userService.createUser(
      'admin@gmail.com',
      'test',
      true,
    );
    console.log(user);
  }
}
