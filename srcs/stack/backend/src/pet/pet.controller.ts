import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { SessionGuard } from '../auth/guards/session.guard';
import { CurrentUserId } from '../auth/decorators/current-user-id.decorator';
import { parseId } from '../common/pipes/parse-id.pipe';
import { UpdatePetDto } from './dto/update-pet.dto';

@UseGuards(SessionGuard)
@Controller()
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post('pets')
  create(@CurrentUserId() userId: string, @Body() dto: CreatePetDto) {
    return this.petService.create(userId, dto);
  }

  @Get('pets/:id')
  findOne(@Param('id', parseId) id: string) {
    return this.petService.findOne(id);
  }

  @Get('users/me/pets')
  findMine(@CurrentUserId() userId: string) {
    return this.petService.findByOwner(userId);
  }

  @Get('users/:id/pets')
  findByUser(@Param('id', parseId) id: string) {
    return this.petService.findByUser(id);
  }

  @Patch('pets/:id')
  update(
    @CurrentUserId() userId: string,
    @Param('id', parseId) id: string,
    @Body() dto: UpdatePetDto,
  ) {
    return this.petService.update(userId, id, dto);
  }
}
