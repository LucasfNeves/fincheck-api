import { CreateTransactionDto } from '../dto/create-transaction.dto.js';
import { UpdateTransactionDto } from '../dto/update-transaction.dto.js';
import {
  Transaction,
  TransactionType,
} from '../entities/transactions.entities.js';

export abstract class TransactionsServiceContract {
  abstract create(
    userId: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction>;

  abstract findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ): Promise<Transaction[]>;

  abstract update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction>;

  abstract remove(userId: string, transactionId: string): Promise<void>;
}
