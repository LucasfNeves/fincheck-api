import { Category } from '../entities/category.entity.js';

export abstract class CategoriesContract {
  abstract findAll(userId: string): Promise<Category[]>;
}
