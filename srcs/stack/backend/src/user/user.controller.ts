import {
  Controller,
  Get,
  Param,
  UseGuards,
  Patch,
  Body,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SessionGuard } from '../auth/guards/session.guard';
import { CurrentUserId } from '../auth/decorators/current-user-id.decorator';
import { UpdateProfilDto } from './dto/update-profile.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { parseId } from '../common/pipes/parse-id.pipe';

@UseGuards(SessionGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  search(@CurrentUserId() userId: string, @Query() query: SearchUserDto) {
    return this.userService.searchUsers(userId, query);
  }

  @Get('me')
  findMe(@CurrentUserId() userId: string) {
    return this.userService.findMyself(userId);
  }

  @Get(':id')
  findOne(@Param('id', parseId) id: string) {
    return this.userService.findOne(id);
  }

  @Patch('me')
  updateMe(@CurrentUserId() userId: string, @Body() dto: UpdateProfilDto) {
    return this.userService.updateProfile(userId, dto);
  }
}
