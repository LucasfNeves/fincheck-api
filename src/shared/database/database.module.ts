import { Global, Module } from '@nestjs/common';
import { UsersRepository } from './repositories/interfaces/users.repository.js';
import { CategoriesRepositoryContract } from './repositories/interfaces/categories.repository.js';
import { PrismaService } from './prisma.service.js';
import { PrismaUsersRepository } from './repositories/prisma/prisma.users.repository.js';
import { PrismaCategoriesRepository } from './repositories/prisma/prisma.categories.repository.js';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    {
      provide: CategoriesRepositoryContract,
      useClass: PrismaCategoriesRepository,
    },
  ],
  exports: [UsersRepository, CategoriesRepositoryContract],
})
export class DatabaseModule {}
