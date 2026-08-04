import { Injectable } from '@nestjs/common';
import { BankAccount } from 'src/modules/bank-accounts/entities/bank-account.entity.js';
import { PrismaService } from '../../prisma.service.js';
import {
  BankAccountsRepositoryContract,
  CreateBankAccountData,
  UpdateBankAccountData,
} from '../interfaces/bank-accounts.repository.js';

const BANK_ACCOUNT_SELECT = {
  id: true,
  userId: true,
  name: true,
  initialBalance: true,
  type: true,
} as const;

@Injectable()
export class PrismaBankAccountsRepository implements BankAccountsRepositoryContract {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateBankAccountData): Promise<BankAccount> {
    const bankAccount = await this.prismaService.bankAccount.create({
      data,
      select: BANK_ACCOUNT_SELECT,
    });

    return bankAccount as BankAccount;
  }

  async findManyByUserId(userId: string): Promise<BankAccount[]> {
    const bankAccounts = await this.prismaService.bankAccount.findMany({
      where: { userId },
      select: {
        ...BANK_ACCOUNT_SELECT,
        transactions: {
          select: {
            type: true,
            value: true,
          }
        }
      },
    });

    return bankAccounts as BankAccount[];
  }

  async findById(id: string): Promise<BankAccount | null> {
    const bankAccount = await this.prismaService.bankAccount.findUnique({
      where: { id },
      select: BANK_ACCOUNT_SELECT,
    });

    return bankAccount as BankAccount | null;
  }

  async update(id: string, data: UpdateBankAccountData): Promise<BankAccount> {
    const bankAccount = await this.prismaService.bankAccount.update({
      where: { id },
      data,
      select: BANK_ACCOUNT_SELECT,
    });

    return bankAccount as BankAccount;
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.bankAccount.delete({ where: { id } });
  }

  async findOneByUserIdAndBankAccountId(
    userId: string,
    bankAccountId: string,
  ): Promise<BankAccount | null> {
    const banckAccount = await this.prismaService.bankAccount.findFirst({
      where: { userId, id: bankAccountId },
      select: BANK_ACCOUNT_SELECT,
    });

    return banckAccount as BankAccount | null;
  }
}
