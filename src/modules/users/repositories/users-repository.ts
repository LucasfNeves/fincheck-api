import { User } from '../entities/user.entity.js';

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

/**
 * Contrato de persistência de usuários. Vive no módulo de domínio: quem
 * implementa (infra) é que depende daqui, nunca o contrário.
 */
export abstract class UsersRepository {
  abstract emailExists(email: string): Promise<boolean>;

  abstract create(data: CreateUserData): Promise<User>;
}
