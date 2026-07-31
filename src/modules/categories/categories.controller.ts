import { Controller, Get } from '@nestjs/common';
import { CategoriesContract } from './interface/categories.interface.js';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId.js';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesContract) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.categoriesService.findAll(userId);
  }
}
