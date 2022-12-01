import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './schemas';
import { randomUUID } from 'crypto';
import { Role } from '../constants';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.userRepository.findOne({ userId });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async createUser(email: string, password: string): Promise<User> {
    const hash = await argon.hash(password);

    return this.userRepository.create({
      email,
      hash,
      roles: [Role.User],
      id: randomUUID(),
    });
  }

  async updateUser(id: string, userUpdates: any): Promise<User> {
    return this.userRepository.findOneAndUpdate({ id }, userUpdates);
  }
}
