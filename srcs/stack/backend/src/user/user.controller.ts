import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SessionGuard } from '../auth/guards/session.guard';
import { CurrentUserId } from '../auth/decorators/current-user-id.decorator';
import { UpdateProfilDto } from './dto/update-profile.dto';

@UseGuards(SessionGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  findMe(@CurrentUserId() userId: string) {
    return this.userService.findMyself(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch('me')
  updateMe(@CurrentUserId() userId: string, @Body() dto: UpdateProfilDto) {
    return this.userService.updateProfile(userId, dto);
  }
}
