export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface Transaction {
  id: string;
  name: string;
  userId: string;
  bankAccountId: string;
  categoryId?: string | null;
  type: TransactionType;
  value: number;
  date: Date;
}
