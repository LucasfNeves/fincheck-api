import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../shared/database/repositories/interfaces/users-repository.js';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}
}
