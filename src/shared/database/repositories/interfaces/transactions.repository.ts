import { Transaction } from 'src/modules/transactions/entities/transactions.entities.js';

export type CreateTransactionData = Pick<
  Transaction,
  'userId' | 'bankAccountId' | 'categoryId' | 'name' | 'value' | 'date' | 'type'
>;

export type UpdateTransactionData = Partial<
  Omit<CreateTransactionData, 'userId'>
>;

export abstract class TransactionsRepositoryContract {
  abstract create(data: CreateTransactionData): Promise<Transaction>;

  abstract findManyByUserId(userId: string): Promise<Transaction[]>;

  abstract findFirstById(id: string): Promise<Transaction | null>;

  abstract findOneByUserIdAndTransactionId(
    userId: string,
    transactionId: string,
  ): Promise<Transaction | null>;

  abstract update(
    id: string,
    data: UpdateTransactionData,
  ): Promise<Transaction>;

  abstract delete(id: string): Promise<void>;
}
