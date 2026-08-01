import { Injectable } from '@nestjs/common';
import { BankAccountsRepositoryContract } from 'src/shared/database/repositories/interfaces/bank-accounts.repository.js';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto.js';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto.js';
import { BankAccount } from '../entities/bank-account.entity.js';
import { BankAccountsServiceContract } from '../interface/bank-accounts.service.interface.js';
import { ValidateBankAccountOwnershipServiceContract } from '../interface/validate-bank-account-ownership.service.interface.js';

@Injectable()
export class BankAccountsService implements BankAccountsServiceContract {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepositoryContract,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipServiceContract,
  ) {}

  create(
    userId: string,
    { name, initialBalance, type }: CreateBankAccountDto,
  ): Promise<BankAccount> {
    return this.bankAccountsRepository.create({
      name,
      initialBalance,
      type,
      userId,
    });
  }

  findAll(userId: string): Promise<BankAccount[]> {
    return this.bankAccountsRepository.findManyByUserId(userId);
  }

  findOne(userId: string, bankAccountId: string): Promise<BankAccount> {
    return this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );
  }

  async update(
    userId: string,
    bankAccountId: string,
    { name, initialBalance, type }: UpdateBankAccountDto,
  ): Promise<BankAccount> {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    return this.bankAccountsRepository.update(bankAccountId, {
      name,
      initialBalance,
      type,
    });
  }

  async remove(userId: string, bankAccountId: string): Promise<void> {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    await this.bankAccountsRepository.delete(bankAccountId);
  }
}
