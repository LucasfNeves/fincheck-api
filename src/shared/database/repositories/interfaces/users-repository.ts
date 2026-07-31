import { User } from '../../../entities/user.entity.js';

export interface CategoryData {
  name: string;
  icon: string;
  type: 'INCOME' | 'EXPENSE';
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  categories: CategoryData[];
}

export type UserProfile = Pick<User, 'name' | 'email'>;

export abstract class UsersRepository {
  abstract emailExists(email: string): Promise<boolean>;

  abstract create(data: CreateUserData): Promise<User>;

  abstract findUniqueByEmail(email: string): Promise<User | null>;

  abstract findProfileById(userId: string): Promise<UserProfile | null>;
}
