import { BankAccount } from '../entities/bank-account.entity.js';

export abstract class ValidateBankAccountOwnershipServiceContract {
  abstract validate(
    userId: string,
    bankAccountId: string,
  ): Promise<BankAccount>;
}
