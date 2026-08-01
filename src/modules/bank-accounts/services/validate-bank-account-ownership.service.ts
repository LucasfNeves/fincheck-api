import { BankAccountsRepositoryContract } from 'src/shared/database/repositories/interfaces/bank-accounts.repository.js';
import { ValidateBankAccountOwnershipServiceContract } from '../interface/validate-bank-account-ownership.service.interface.js';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ValidateBankAccountOwnershipService implements ValidateBankAccountOwnershipServiceContract {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepositoryContract,
  ) {}
  async validate(userId: string, bankAccountId: string): Promise<void> {
    const isOwner =
      await this.bankAccountsRepository.findOneByUserIdAndBankAccountId(
        userId,
        bankAccountId,
      );

    if (!isOwner) {
      throw new NotFoundException('Bank account not found');
    }
  }
}
