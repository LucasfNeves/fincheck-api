import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../entities/transactions.entities.js';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  bankAccountId: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  categoryId: string | null;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(TransactionType)
  type: TransactionType;
}
