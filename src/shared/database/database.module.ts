import { Global, Module } from '@nestjs/common';
import { UsersRepository } from './repositories/interfaces/users.repository.js';
import { CategoriesRepositoryContract } from './repositories/interfaces/categories.repository.js';
import { BankAccountsRepositoryContract } from './repositories/interfaces/bank-accounts.repository.js';
import { PrismaService } from './prisma.service.js';
import { PrismaUsersRepository } from './repositories/prisma/prisma.users.repository.js';
import { PrismaCategoriesRepository } from './repositories/prisma/prisma.categories.repository.js';
import { PrismaBankAccountsRepository } from './repositories/prisma/prisma.bank-accounts.repository.js';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    {
      provide: CategoriesRepositoryContract,
      useClass: PrismaCategoriesRepository,
    },
    {
      provide: BankAccountsRepositoryContract,
      useClass: PrismaBankAccountsRepository,
    },
  ],
  exports: [
    UsersRepository,
    CategoriesRepositoryContract,
    BankAccountsRepositoryContract,
  ],
})
export class DatabaseModule {}
