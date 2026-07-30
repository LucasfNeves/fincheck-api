import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module.js';
import { DatabaseModule } from './shared/database/database.module.js';
import { AuthModule } from './modules/auth/auth.module.js';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
