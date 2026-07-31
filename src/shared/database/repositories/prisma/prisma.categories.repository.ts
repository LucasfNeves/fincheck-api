import { Injectable } from '@nestjs/common';
import { CategoryData } from '../interfaces/users.repository.js';
import { PrismaService } from '../../prisma.service.js';
import { CategoriesRepositoryContract } from '../interfaces/categories.repository.js';

@Injectable()
export class PrismaCategoriesRepository implements CategoriesRepositoryContract {
  constructor(private readonly prismaService: PrismaService) {}

  findAllCategories(userId: string): Promise<CategoryData[]> {
    return this.prismaService.category.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        icon: true,
        type: true,
      },
    });
  }
}
