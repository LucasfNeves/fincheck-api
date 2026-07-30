import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module.js';
import { DatabaseModule } from './shared/database/database.module.js';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
