import { Module } from '@nestjs/common';
import { CategoriesContract } from './interface/categories.interface.js';
import { CategoriesController } from './categories.controller.js';
import { CategoriesService } from './categories.service.js';

@Module({
  controllers: [CategoriesController],
  providers: [{ provide: CategoriesContract, useClass: CategoriesService }],
})
export class CategoriesModule {}
