import { Injectable } from '@nestjs/common';
import { Category } from 'src/modules/categories/entities/category.entity.js';
import { PrismaService } from '../../prisma.service.js';
import { CategoriesRepositoryContract } from '../interfaces/categories.repository.js';

const CATEGORY_SELECT = {
  id: true,
  userId: true,
  name: true,
  icon: true,
  type: true,
} as const;

@Injectable()
export class PrismaCategoriesRepository implements CategoriesRepositoryContract {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllCategories(userId: string): Promise<Category[]> {
    const categories = await this.prismaService.category.findMany({
      where: { userId },
      select: CATEGORY_SELECT,
    });

    return categories as Category[];
  }

  async findOneByUserIdAndCategoryId(
    userId: string,
    categoryId: string,
  ): Promise<Category | null> {
    const category = await this.prismaService.category.findFirst({
      where: { userId, id: categoryId },
      select: CATEGORY_SELECT,
    });

    return category as Category | null;
  }
}
