import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BankAccountsRepositoryContract } from 'src/shared/database/repositories/interfaces/bank-accounts.repository.js';
import { CreateBankAccountDto } from './dto/create-bank-account.dto.js';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto.js';
import { BankAccount } from './entities/bank-account.entity.js';
import { BankAccountsServiceContract } from './interface/bank-accounts.service.interface.js';

@Injectable()
export class BankAccountsService implements BankAccountsServiceContract {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepositoryContract,
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
    return this._getOwnedBankAccount(userId, bankAccountId);
  }

  async update(
    userId: string,
    bankAccountId: string,
    { name, initialBalance, type }: UpdateBankAccountDto,
  ): Promise<BankAccount> {
    await this._getOwnedBankAccount(userId, bankAccountId);

    return this.bankAccountsRepository.update(bankAccountId, {
      name,
      initialBalance,
      type,
    });
  }

  async remove(userId: string, bankAccountId: string): Promise<void> {
    await this._getOwnedBankAccount(userId, bankAccountId);

    await this.bankAccountsRepository.delete(bankAccountId);
  }

  private async _getOwnedBankAccount(
    userId: string,
    bankAccountId: string,
  ): Promise<BankAccount> {
    const bankAccount =
      await this.bankAccountsRepository.findById(bankAccountId);

    if (!bankAccount) {
      throw new NotFoundException('Bank account not found');
    }

    if (bankAccount.userId !== userId) {
      throw new ForbiddenException('This bank account belongs to another user');
    }

    return bankAccount;
  }
}
