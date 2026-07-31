import { CategoryData } from 'src/shared/database/repositories/interfaces/users.repository.js';

export abstract class CategoriesContract {
  abstract findAll(userId: string): Promise<CategoryData[]>;
}
