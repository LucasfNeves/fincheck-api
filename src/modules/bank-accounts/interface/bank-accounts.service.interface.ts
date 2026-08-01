import { CreateBankAccountDto } from '../dto/create-bank-account.dto.js';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto.js';
import { BankAccount } from '../entities/bank-account.entity.js';

export abstract class BankAccountsServiceContract {
  abstract create(
    userId: string,
    createBankAccountDto: CreateBankAccountDto,
  ): Promise<BankAccount>;

  abstract findAll(userId: string): Promise<BankAccount[]>;

  abstract update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ): Promise<BankAccount>;

  abstract remove(userId: string, bankAccountId: string): Promise<void>;
}
