import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { SessionGuard } from '../auth/guards/session.guard';
import { CurrentUserId } from '../auth/decorators/current-user-id.decorator';
import { parseId } from '../common/pipes/parse-id.pipe';

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
}
