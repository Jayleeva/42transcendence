import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../generated/prisma/client';
import { CreateUserData } from './user.types';
import { UpdateProfilDto } from './dto/update-profile.dto';
import { SearchUserDto } from './dto/search-user.dto';

const MIN_AGE = 13;

const publicUserSelect = {
  id: true,
  username: true,
  firstname: true,
  lastname: true,
  avatar: true,
  bio: true,
  createdAt: true,
} as const;

const privateUserSelect = {
  id: true,
  username: true,
  firstname: true,
  lastname: true,
  birthDate: true,
  avatar: true,
  bio: true,
  createdAt: true,
  email: true,
} as const;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  searchUsers(currentUserId: string, query: SearchUserDto) {
    const where: Prisma.UserWhereInput = { id: { not: currentUserId } };

    if (query.search) {
      where.OR = [
        { username: { contains: query.search, mode: 'insensitive' } },
        { firstname: { contains: query.search, mode: 'insensitive' } },
        { lastname: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    return this.prisma.user.findMany({
      where,
      select: publicUserSelect,
      orderBy: { username: 'asc' },
      take: query.take,
      skip: query.skip,
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

  async findMyself(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: privateUserSelect,
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
      where: { provider_providerAccountId: { provider, providerAccountId } },
      select: { user: { select: publicUserSelect } },
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

  async updateProfile(id: string, dto: UpdateProfilDto) {
    const { birthDate, ...rest } = dto;
    const data: Prisma.UserUpdateInput = { ...rest };
    const where: Prisma.UserWhereUniqueInput = { id };

    if (birthDate !== undefined) {
      const date = new Date(birthDate);
      const latestAllowed = new Date();
      latestAllowed.setUTCFullYear(latestAllowed.getUTCFullYear() - MIN_AGE);
      if (date > latestAllowed) {
        throw new BadRequestException({
          statusCode: 400,
          errors: [{ field: 'birthDate', code: 'BIRTHDATE_TOO_YOUNG' }],
        });
      }
      data.birthDate = date;
      where.birthDate = null;
    }
    try {
      return await this.prisma.user.update({
        where,
        data,
        select: privateUserSelect,
      });
    } catch (error) {
      if (
        birthDate !== undefined &&
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new ConflictException({
          statusCode: 409,
          errors: [{ field: 'birthDate', code: 'BIRTHDATE_ALREADY_SET' }],
        });
      }
      this.rethrowPrismaError(error);
    }
  }

  async createOAuthUser(
    data: CreateUserData,
    provider: string,
    providerAccountId: string,
  ) {
    try {
      return await this.prisma.$transaction(
        async (tx: Prisma.TransactionClient) => {
          const user = await tx.user.create({
            data,
            select: publicUserSelect,
          });

          await tx.oAuthAccount.create({
            data: { userId: user.id, provider, providerAccountId },
          });
          return user;
        },
      );
    } catch (error) {
      this.rethrowPrismaError(error);
    }
  }

  linkOAuthAccount(
    userId: string,
    provider: string,
    providerAccountId: string,
  ) {
    return this.prisma.oAuthAccount.create({
      data: { userId, provider, providerAccountId },
    });
  }

  private rethrowPrismaError(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const meta = error.meta as
        | {
            driverAdapterError?: {
              cause?: {
                constraint?: {
                  index?: string;
                };
              };
            };
          }
        | undefined;

      const index = meta?.driverAdapterError?.cause?.constraint?.index;

      let field = 'unknown';
      let code = 'UNIQUE_CONSTRAINT_VIOLATION';

      if (index === 'User_email_key') {
        field = 'email';
        code = 'EMAIL_ALREADY_EXISTS';
      } else if (index === 'User_username_key') {
        field = 'username';
        code = 'USERNAME_ALREADY_EXISTS';
      }

      throw new ConflictException({
        statusCode: 409,
        errors: [{ field, code }],
      });
    }
    throw error;
  }
}
