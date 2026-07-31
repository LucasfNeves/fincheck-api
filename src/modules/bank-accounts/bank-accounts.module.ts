import { Module } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service.js';
import { BankAccountsController } from './bank-accounts.controller.js';
import { BankAccountsServiceContract } from './interface/bank-accounts.service.interface.js';

@Module({
  controllers: [BankAccountsController],
  providers: [
    { provide: BankAccountsServiceContract, useClass: BankAccountsService },
  ],
})
export class BankAccountsModule {}
