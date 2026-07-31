export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  icon: string;
  type: TransactionType;
}
