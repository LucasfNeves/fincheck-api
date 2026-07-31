import { Category } from 'src/modules/categories/entities/category.entity.js';

export type CreateCategoryData = Pick<Category, 'name' | 'icon' | 'type'>;

export abstract class CategoriesRepositoryContract {
  abstract findAllCategories(userId: string): Promise<Category[]>;
}
