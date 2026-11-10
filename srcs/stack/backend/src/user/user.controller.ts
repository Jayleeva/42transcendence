import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Patch,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SessionGuard } from '../auth/guards/session.guard';
import { CurrentUserId } from '../auth/decorators/current-user-id.decorator';
import { UpdateProfilDto } from './dto/update-profile.dto';
import { SearchUserDto } from './dto/search-user.dto';

const parseUserId = new ParseUUIDPipe({
  exceptionFactory: () =>
    new BadRequestException({
      statusCode: 400,
      errors: [{ field: 'id', code: 'ID_INVALID_FORMAT' }],
    }),
});

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
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch('me')
  updateMe(@CurrentUserId() userId: string, @Body() dto: UpdateProfilDto) {
    return this.userService.updateProfile(userId, dto);
  }
}
