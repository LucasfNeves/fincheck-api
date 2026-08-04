import { Transaction } from 'src/modules/transactions/entities/transactions.entities.js';

export enum BankAccountType {
  CHECKING = 'CHECKING',
  INVESTMENT = 'INVESTMENT',
  CASH = 'CASH',
}

export interface BankAccount {
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: BankAccountType;
  currentBalance: number;
  transactions?: Transaction[];
}
