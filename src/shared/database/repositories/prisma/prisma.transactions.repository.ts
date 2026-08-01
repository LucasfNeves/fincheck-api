import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service.js';
import {
  CreateTransactionData,
  TransactionsRepositoryContract,
  UpdateTransactionData,
} from '../interfaces/transactions.repository.js';
import { Transaction } from 'src/modules/transactions/entities/transactions.entities.js';

const TRANSACTIONS_SELECT = {
  id: true,
  userId: true,
  bankAccountId: true,
  categoryId: true,
  name: true,
  value: true,
  date: true,
  type: true,
} as const;

@Injectable()
export class PrismaTransactionsRepository
  implements TransactionsRepositoryContract
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateTransactionData): Promise<Transaction> {
    const transaction = await this.prismaService.transaction.create({
      data,
      select: TRANSACTIONS_SELECT,
    });

    return transaction as Transaction;
  }

  async findManyByUserId(userId: string): Promise<Transaction[]> {
    const transactions = await this.prismaService.transaction.findMany({
      where: { userId },
      select: TRANSACTIONS_SELECT,
    });

    return transactions as Transaction[];
  }

  async findFirstById(id: string): Promise<Transaction | null> {
    const transaction = await this.prismaService.transaction.findFirst({
      where: { id },
      select: TRANSACTIONS_SELECT,
    });

    return transaction as Transaction | null;
  }

  async findOneByUserIdAndTransactionId(
    userId: string,
    transactionId: string,
  ): Promise<Transaction | null> {
    const transaction = await this.prismaService.transaction.findFirst({
      where: { userId, id: transactionId },
      select: TRANSACTIONS_SELECT,
    });

    return transaction as Transaction | null;
  }

  async update(
    id: string,
    data: UpdateTransactionData,
  ): Promise<Transaction> {
    const transaction = await this.prismaService.transaction.update({
      where: { id },
      data,
      select: TRANSACTIONS_SELECT,
    });

    return transaction as Transaction;
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.transaction.delete({ where: { id } });
  }
}
