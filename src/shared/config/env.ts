import { IsNotEmpty, NotEquals, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

class Env {
  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecuret-jwt-secret')
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  databaseUrl: string;
}

export const env: Env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
});

const errors = validateSync(env, {
  skipMissingProperties: false,
  whitelist: true,
  forbidNonWhitelisted: true,
});

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
