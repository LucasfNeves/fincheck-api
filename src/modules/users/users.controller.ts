import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async me(@Query('userId') userId: string) {
    return await this.usersService.findById(userId);
  }
}
