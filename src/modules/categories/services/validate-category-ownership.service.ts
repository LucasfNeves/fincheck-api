import { CategoriesRepositoryContract } from 'src/shared/database/repositories/interfaces/categories.repository.js';
import { ValidateCategoryOwnershipServiceContract } from '../interface/validate-category-ownership.interface.js';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ValidateCategoryOwnershipService implements ValidateCategoryOwnershipServiceContract {
  constructor(
    private readonly categoriesRepository: CategoriesRepositoryContract,
  ) {}

  async validate(userId: string, categoryId?: string | null): Promise<void> {
    if (!categoryId) {
      return;
    }

    const category =
      await this.categoriesRepository.findOneByUserIdAndCategoryId(
        userId,
        categoryId,
      );

    if (!category) {
      throw new NotFoundException('Category not found');
    }
  }
}
