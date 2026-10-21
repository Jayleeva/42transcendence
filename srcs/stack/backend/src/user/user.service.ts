import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../generated/prisma/client';
import { CreateUserData } from './user.types';

const publicUserSelect = {
  id: true,
  username: true,
  firstname: true,
  lastname: true,
  avatar: true,
  bio: true,
  createdAt: true,
} as const;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: publicUserSelect,
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: publicUserSelect,
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
        where: { id },
        select: publicUserSelect,
    });
  }

  findByEmailWithPassword(email: string) {
    return this.prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            username: true,
            password: true,
        },
    });
  }

  findByOAuthAccount(provider: string, providerAccountId: string) {
    return this.prisma.oAuthAccount.findUnique({
        where: { provider_providerAccountId: {provider, providerAccountId} },
        select: { user: { select: publicUserSelect}},
    });
  }

  async createUser(data: CreateUserData) {
    try {
        return await this.prisma.user.create({
            data,
            select: publicUserSelect,
        });
    } catch (error) {
        this.rethrowPrismaError(error);
    }
  }

  async createOAuthUser(
    data: CreateUserData,
    provider: string,
    providerAccountId: string,
  ) {
    try {
        return await this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data,
                select: publicUserSelect,
            });

        await tx.oAuthAccount.create({
            data: {userId: user.id, provider, providerAccountId},
        });
        return user;
        });
    }
    catch (error) {
        this.rethrowPrismaError(error);
    }
  }

  linkOAuthAccount(
    userId: string,
    provider: string,
    providerAccountId: string,
  ) {
    return this.prisma.oAuthAccount.create({
        data: {userId, provider, providerAccountId},
    });
  }

   private rethrowPrismaError(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const fields = (error.meta?.target as string[]) ?? [];
      throw new ConflictException({
        statusCode: 409,
        error: 'Conflict',
        fields,
        message: `${fields.join(', ')} already in use`,
      });
    }
    throw error;
  }
}
