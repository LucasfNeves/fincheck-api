import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BankAccountType } from '../entities/bank-account.entity.js';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(BankAccountType)
  type: BankAccountType;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;
}
