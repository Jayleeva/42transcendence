import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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

@Injectable()
export class PetService {
  constructor(private readonly prisma: PrismaService) {}

  create(ownerId: string, dto: CreatePetDto) {
    const { birthDate, ...rest } = dto;
    let date: Date | undefined;

    if (birthDate) {
      date = new Date(birthDate);
      if (date > new Date()) {
        throw new BadRequestException({
          statusCode: 400,
          errors: [{ field: 'birthDate', code: 'BIRTHDATE_IN_FUTURE' }],
        });
      }
    }
    return this.prisma.pet.create({
      data: { ...rest, birthDate: date, ownerId },
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
}
