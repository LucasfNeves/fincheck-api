import { CategoryData } from './users.repository.js';

export abstract class CategoriesRepositoryContract {
  abstract findAllCategories(userId: string): Promise<CategoryData[]>;
}
