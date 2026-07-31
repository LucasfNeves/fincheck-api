import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthenticateDto } from './dto/authenticate.dto.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { IsPublic } from 'src/shared/decorators/isPublic.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
