import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [PrismaModule, StorageModule],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
