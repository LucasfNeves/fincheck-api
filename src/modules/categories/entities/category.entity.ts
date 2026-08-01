import { TransactionType } from 'src/modules/transactions/entities/transactions.entities.js';

export interface Category {
  id: string;
  userId: string;
  name: string;
  icon: string;
  type: TransactionType;
}
