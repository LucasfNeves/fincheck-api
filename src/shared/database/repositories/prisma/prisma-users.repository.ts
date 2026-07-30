import { Injectable } from '@nestjs/common';
import { User } from '../../../entities/user.entity.js';
import {
  CreateUserData,
  UsersRepository,
} from '../interfaces/users-repository.js';
import { PrismaService } from '../../prisma.service.js';

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

  async findUniqueByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    return user;
  }
}
