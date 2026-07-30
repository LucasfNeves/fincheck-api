import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto.js';
import {
  CategoryData,
  UsersRepository,
} from '../../shared/database/repositories/interfaces/users-repository.js';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto.js';

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
export class AuthService {
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

    console.log(user);
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
