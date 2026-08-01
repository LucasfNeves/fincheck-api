import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepositoryContract } from 'src/shared/database/repositories/interfaces/transactions.repository.js';
import { ValidateBankAccountOwnershipServiceContract } from '../bank-accounts/interface/validate-bank-account-ownership.service.interface.js';
import { CreateTransactionDto } from './dto/create-transaction.dto.js';
import { UpdateTransactionDto } from './dto/update-transaction.dto.js';
import { Transaction } from './entities/transactions.entities.js';
import { TransactionsServiceContract } from './interface/transactions.service.interface.js';
import { ValidateCategoryOwnershipServiceContract } from '../categories/interface/validate-category-ownership.interface.js';

@Injectable()
export class TransactionsService implements TransactionsServiceContract {
  constructor(
    private readonly transactionsRepository: TransactionsRepositoryContract,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipServiceContract,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipServiceContract,
  ) {}

  async create(
    userId: string,
    {
      name,
      value,
      date,
      type,
      bankAccountId,
      categoryId,
    }: CreateTransactionDto,
  ): Promise<Transaction> {
    await this.validateEntitiesOwnership(userId, bankAccountId, categoryId);

    return this.transactionsRepository.create({
      userId,
      bankAccountId,
      categoryId: categoryId ?? null,
      name,
      value,
      date: new Date(date),
      type,
    });
  }

  findAllByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionsRepository.findManyByUserId(userId);
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const { name, value, date, type, bankAccountId, categoryId } =
      updateTransactionDto;

    await this.validateEntitiesOwnership(
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    );

    return this.transactionsRepository.update(transactionId, {
      bankAccountId,
      categoryId: categoryId ?? null,
      name,
      value,
      date: new Date(date),
      type,
    });
  }

  async remove(userId: string, transactionId: string): Promise<void> {
    await this.validateTransactionOwnership(userId, transactionId);

    await this.transactionsRepository.delete(transactionId);
  }

  private async validateTransactionOwnership(
    userId: string,
    transactionId: string,
  ): Promise<Transaction> {
    const transaction =
      await this.transactionsRepository.findOneByUserIdAndTransactionId(
        userId,
        transactionId,
      );

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  private async validateEntitiesOwnership(
    userId: string,
    bankAccountId: string,
    categoryId?: string | null,
    transactionId?: string | null,
  ): Promise<void> {
    await Promise.all([
      this.validateBankAccountOwnershipService.validate(userId, bankAccountId),
      this.validateCategoryOwnershipService.validate(userId, categoryId),
      transactionId
        ? this.validateTransactionOwnership(userId, transactionId)
        : undefined,
    ]);
  }
}
