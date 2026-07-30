import { Global, Module } from '@nestjs/common';
import { UsersRepository } from '../../modules/users/repositories/users-repository.js';
import { PrismaService } from './prisma.service.js';
import { PrismaUsersRepository } from './repositories/prisma-users.repository.js';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
