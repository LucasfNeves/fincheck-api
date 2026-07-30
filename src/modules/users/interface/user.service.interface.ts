import { UserProfile } from '../../../shared/database/repositories/interfaces/users-repository.js';

export abstract class UsersServiceContract {
  abstract findById(userId: string): Promise<UserProfile>;
}
