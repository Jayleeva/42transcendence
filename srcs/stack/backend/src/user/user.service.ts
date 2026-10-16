import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../generated/prisma/client';
import bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

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

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    try {
      return await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          firstname: dto.firstname,
          lastname: dto.lastname,
          password: hashedPassword,
        },
        select: publicUserSelect,
      });
    } catch (error) {
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
}
