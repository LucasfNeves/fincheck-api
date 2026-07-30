import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto.js';
import {
  CategoryData,
  UsersRepository,
} from './repositories/users-repository.js';

const DEFAULT_CATEGORIES: CategoryData[] = [
  // Income
  { name: 'Salário', icon: 'salary', type: 'INCOME' },
  { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
  { name: 'Outro', icon: 'other', type: 'INCOME' },
  // Expense
  { name: 'Casa', icon: 'home', type: 'EXPENSE' },
  { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
  { name: 'Educação', icon: 'education', type: 'EXPENSE' },
  { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
  { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
  { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
  { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
  { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
  { name: 'Outro', icon: 'other', type: 'EXPENSE' },
];

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create({ name, email, password }: CreateUserDto) {
    const emailTaken = await this.usersRepo.emailExists(email);

    if (emailTaken) {
      throw new ConflictException('This email is already taken');
    }

    const hashedPassword = await hash(password, 12);

    return this.usersRepo.create({
      name,
      email,
      password: hashedPassword,
      categories: DEFAULT_CATEGORIES,
    });
  }
}
