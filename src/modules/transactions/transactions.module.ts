import { Module } from '@nestjs/common';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module.js';
import { CategoriesModule } from '../categories/categories.module.js';
import { TransactionsController } from './transactions.controller.js';
import { TransactionsService } from './transactions.service.js';
import { TransactionsServiceContract } from './interface/transactions.service.interface.js';

@Module({
  imports: [BankAccountsModule, CategoriesModule],
  controllers: [TransactionsController],
  providers: [
    { provide: TransactionsServiceContract, useClass: TransactionsService },
  ],
})
export class TransactionsModule {}
