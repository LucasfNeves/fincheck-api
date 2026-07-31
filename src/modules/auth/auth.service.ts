import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto.js';
import { UsersRepository } from '../../shared/database/repositories/interfaces/users.repository.js';
import { CreateCategoryData } from '../../shared/database/repositories/interfaces/categories.repository.js';
import { TransactionType } from '../categories/entities/category.entity.js';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto.js';
import { AuthServiceContract } from './interface/auth.service.interface.js';

const DEFAULT_CATEGORIES: CreateCategoryData[] = [
  // Income
  { name: 'Salário', icon: 'salary', type: TransactionType.INCOME },
  { name: 'Freelance', icon: 'freelance', type: TransactionType.INCOME },
  { name: 'Outro', icon: 'other', type: TransactionType.INCOME },
  // Expense
  { name: 'Casa', icon: 'home', type: TransactionType.EXPENSE },
  { name: 'Alimentação', icon: 'food', type: TransactionType.EXPENSE },
  { name: 'Educação', icon: 'education', type: TransactionType.EXPENSE },
  { name: 'Lazer', icon: 'fun', type: TransactionType.EXPENSE },
  { name: 'Mercado', icon: 'grocery', type: TransactionType.EXPENSE },
  { name: 'Roupas', icon: 'clothes', type: TransactionType.EXPENSE },
  { name: 'Transporte', icon: 'transport', type: TransactionType.EXPENSE },
  { name: 'Viagem', icon: 'travel', type: TransactionType.EXPENSE },
  { name: 'Outro', icon: 'other', type: TransactionType.EXPENSE },
];

@Injectable()
export class AuthService implements AuthServiceContract {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const emailTaken = await this.usersRepository.emailExists(email);

    if (emailTaken) {
      throw new ConflictException('This email is already taken');
    }

    const hashedPassword = await hash(password, 12);

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      categories: DEFAULT_CATEGORIES,
    });

    const accessToken = await this._generateAccessToken(createdUser.id);

    return { accessToken };
  }

  async authenticate({ email, password }: AuthenticateDto) {
    const user = await this.usersRepository.findUniqueByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await compare(password, user?.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this._generateAccessToken(user.id);

    return { accessToken };
  }

  private _generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
