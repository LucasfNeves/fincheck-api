import { Global, Module } from '@nestjs/common';
import { UsersRepository } from './repositories/interfaces/users-repository.js';
import { PrismaService } from './prisma.service.js';
import { PrismaUsersRepository } from './repositories/prisma/prisma-users.repository.js';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
