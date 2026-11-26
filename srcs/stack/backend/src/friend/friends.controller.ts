import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseUUIDPipe,
  BadRequestException, Delete, HttpCode, HttpStatus
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { SessionGuard } from '../auth/guards/session.guard';
import { CurrentUserId } from '../auth/decorators/current-user-id.decorator';

@Controller()
export class FriendsController {
  constructor(private readonly friendService: FriendService) {}

    @Get('users/:id/friends')
    @UseGuards(SessionGuard)
    getFriends(
      @Param('id', new ParseUUIDPipe({
        version: '4',
       exceptionFactory: () =>
          new BadRequestException({
            statusCode: 400,
            errors: [{ field: 'id', code: 'USER_ID_INVALID' }],
          }),
      })) id: string,
    ) {
      return this.friendService.getFriends(id);
    }

    @Delete('friends/:userId')
    @UseGuards(SessionGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    removeFriend(
    @CurrentUserId() userId: string,
    @Param('userId', new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
        new BadRequestException({
            statusCode: 400,
            errors: [{ field: 'userId', code: 'USER_ID_INVALID' }],
        }),
    })) friendId: string,
    ) {
    return this.friendService.removeFriend(userId, friendId);
    }
}