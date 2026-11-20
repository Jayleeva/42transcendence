import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../generated/prisma/client';
import { UpdatePetDto } from './dto/update-pet.dto';
import { CreatePetDto } from './dto/create-pet.dto';

const petSelect = {
  id: true,
  name: true,
  species: true,
  race: true,
  birthDate: true,
  bio: true,
  avatar: true,
  createdAt: true,
  owner: { select: { id: true, username: true, avatar: true } },
} as const;

function toPetBirthDate(value: string): Date {
  const date = new Date(value);
  if (date > new Date()) {
    throw new BadRequestException({
      statusCode: 400,
      errors: [{ field: 'birthDate', code: 'BIRTHDATE_IN_FUTURE' }],
    });
  }
  return date;
}

@Injectable()
export class PetService {
  constructor(private readonly prisma: PrismaService) {}

  create(ownerId: string, dto: CreatePetDto) {
    const { birthDate, ...rest } = dto;
    return this.prisma.pet.create({
      data: {
        ...rest,
        birthDate: birthDate ? toPetBirthDate(birthDate) : undefined,
        ownerId,
      },
      select: petSelect,
    });
  }

  async findOne(id: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id },
      select: petSelect,
    });

    if (!pet) {
      throw new NotFoundException({
        statusCode: 404,
        errors: [{ field: 'id', code: 'PET_NOT_FOUND' }],
      });
    }
    return pet;
  }

  findByOwner(ownerId: string) {
    return this.prisma.pet.findMany({
      where: { ownerId },
      select: petSelect,
      orderBy: { createdAt: 'asc' },
    });
  }

  async findByUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException({
        statusCode: 404,
        errors: [{ field: 'id', code: 'USER_NOT_FOUND' }],
      });
    }
    return this.findByOwner(userId);
  }

  async update(userId: string, id: string, dto: UpdatePetDto) {
    await this.assertOwner(userId, id);

    const { birthDate, ...rest } = dto;
    const data: Prisma.PetUpdateInput = { ...rest };
    if (birthDate !== undefined) {
      data.birthDate = birthDate === null ? null : toPetBirthDate(birthDate);
    }

    try {
      return await this.prisma.pet.update({
        where: { id },
        data,
        select: petSelect,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException({
          statusCode: 404,
          errors: [{ field: 'id', code: 'PET_NOT_FOUND' }],
        });
      }
      throw error;
    }
  }

  private async assertOwner(userId: string, petId: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id: petId },
      select: { ownerId: true },
    });

    if (!pet) {
      throw new NotFoundException({
        statusCode: 404,
        errors: [{ field: 'id', code: 'PET_NOT_FOUND' }],
      });
    }
    if (pet.ownerId !== userId) {
      throw new ForbiddenException({
        statusCode: 403,
        errors: [{ field: 'id', code: 'PET_NOT_OWNER' }],
      });
    }
  }
}
