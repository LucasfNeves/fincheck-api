import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesContract } from '../interface/categories.interface.js';
import { UsersRepository } from 'src/shared/database/repositories/interfaces/users.repository.js';
import { CategoriesRepositoryContract } from 'src/shared/database/repositories/interfaces/categories.repository.js';
import { Category } from '../entities/category.entity.js';

@Injectable()
export class CategoriesService implements CategoriesContract {
  constructor(
    private readonly categoriesRepository: CategoriesRepositoryContract,
    private readonly usersRepository: UsersRepository,
  ) {}

  async findAll(userId: string): Promise<Category[]> {
    const userExists = await this.usersRepository.findProfileById(userId);

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const categories =
      await this.categoriesRepository.findAllCategories(userId);

    return categories;
  }
}
