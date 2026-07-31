import { AuthenticateDto } from '../dto/authenticate.dto.js';
import { CreateUserDto } from '../dto/create-user.dto.js';

export interface AuthResponse {
  accessToken: string;
}

export abstract class AuthServiceContract {
  abstract create(createUserDto: CreateUserDto): Promise<AuthResponse>;

  abstract authenticate(
    authenticateDto: AuthenticateDto,
  ): Promise<AuthResponse>;
}
