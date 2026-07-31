import { Body, Controller, Post } from '@nestjs/common';
import { AuthServiceContract } from './interface/auth.service.interface.js';
import { AuthenticateDto } from './dto/authenticate.dto.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { IsPublic } from 'src/shared/decorators/isPublic.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthServiceContract) {}

  @Post('signup')
  @IsPublic()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('signin')
  @IsPublic()
  async authenticate(@Body() authenticateDto: AuthenticateDto) {
    return await this.authService.authenticate(authenticateDto);
  }
}
