import { Module } from '@nestjs/common';
import { CategoriesContract } from './interface/categories.interface.js';
import { CategoriesController } from './categories.controller.js';
import { CategoriesService } from './services/categories.service.js';
import { ValidateCategoryOwnershipServiceContract } from './interface/validate-category-ownership.interface.js';
import { ValidateCategoryOwnershipService } from './services/validate-category-ownership.service.js';

@Module({
  controllers: [CategoriesController],
  providers: [
    { provide: CategoriesContract, useClass: CategoriesService },
    {
      provide: ValidateCategoryOwnershipServiceContract,
      useClass: ValidateCategoryOwnershipService,
    },
  ],
  exports: [ValidateCategoryOwnershipServiceContract],
})
export class CategoriesModule {}
