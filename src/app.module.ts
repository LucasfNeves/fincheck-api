import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module.js';
import { DatabaseModule } from './shared/database/database.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { AuthGuard } from './modules/auth/guards/auth.guard.js';
import { APP_GUARD } from '@nestjs/core';
import { CategoriesModule } from './modules/categories/categories.module.js';
import { BankAccountsModule } from './modules/bank-accounts/bank-accounts.module.js';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    BankAccountsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
