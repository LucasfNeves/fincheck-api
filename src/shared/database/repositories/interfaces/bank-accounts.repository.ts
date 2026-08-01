import { BankAccount } from 'src/modules/bank-accounts/entities/bank-account.entity.js';

export type CreateBankAccountData = Pick<
  BankAccount,
  'userId' | 'name' | 'initialBalance' | 'type'
>;

export type UpdateBankAccountData = Partial<
  Omit<CreateBankAccountData, 'userId'>
>;

export abstract class BankAccountsRepositoryContract {
  abstract create(data: CreateBankAccountData): Promise<BankAccount>;

  abstract findManyByUserId(userId: string): Promise<BankAccount[]>;

  abstract findById(id: string): Promise<BankAccount | null>;

  abstract update(
    id: string,
    data: UpdateBankAccountData,
  ): Promise<BankAccount>;

  abstract delete(id: string): Promise<void>;

  abstract findOneByUserIdAndBankAccountId(
    userId: string,
    bankAccountId: string,
  ): Promise<BankAccount | null>;
}
