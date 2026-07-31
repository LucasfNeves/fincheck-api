import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../shared/database/repositories/interfaces/users-repository.js';
import { UsersServiceContract } from './interface/user.service.interface.js';

@Injectable()
export class UsersService implements UsersServiceContract {
  constructor(private readonly usersRepo: UsersRepository) {}

  async findById(userId: string) {
    const user = await this.usersRepo.findProfileById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      name: user.name,
      email: user.email,
    };
  }
}
