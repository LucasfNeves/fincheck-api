import { Module } from '@nestjs/common';
import { BankAccountsService } from './services/bank-accounts.service.js';
import { BankAccountsController } from './bank-accounts.controller.js';
import { BankAccountsServiceContract } from './interface/bank-accounts.service.interface.js';
import { ValidateBankAccountOwnershipServiceContract } from './interface/validate-bank-account-ownership.service.interface.js';
import { ValidateBankAccountOwnershipService } from './services/validate-bank-account-ownership.service.js';

@Module({
  controllers: [BankAccountsController],
  providers: [
    { provide: BankAccountsServiceContract, useClass: BankAccountsService },
    {
      provide: ValidateBankAccountOwnershipServiceContract,
      useClass: ValidateBankAccountOwnershipService,
    },
  ],
  exports: [ValidateBankAccountOwnershipServiceContract],
})
export class BankAccountsModule {}
