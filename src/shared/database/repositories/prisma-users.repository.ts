import { Injectable } from '@nestjs/common';
import { User } from '../../../modules/users/entities/user.entity.js';
import {
  CreateUserData,
  UsersRepository,
} from '../../../modules/users/repositories/users-repository.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async emailExists(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return user !== null;
  }

  create({ categories, ...user }: CreateUserData): Promise<User> {
    return this.prismaService.user.create({
      data: {
        ...user,
        categories: {
          createMany: { data: categories },
        },
      },
    });
  }
}
