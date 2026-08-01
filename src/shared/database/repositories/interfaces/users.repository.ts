import { User } from 'src/modules/users/entities/user.entity.js';
import { CreateCategoryData } from './categories.repository.js';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  categories: CreateCategoryData[];
}

export type UserProfile = Pick<User, 'id' | 'name' | 'email'>;

export abstract class UsersRepository {
  abstract emailExists(email: string): Promise<boolean>;

  abstract create(data: CreateUserData): Promise<User>;

  abstract findUniqueByEmail(email: string): Promise<User | null>;

  abstract findProfileById(userId: string): Promise<UserProfile | null>;
}
