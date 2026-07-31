import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async me(@ActiveUserId() userId: string) {
    return await this.usersService.findById(userId);
  }
}
