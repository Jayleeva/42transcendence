import { Controller, Post, Get, UseGuards, Body, Patch, Param, ParseUUIDPipe, BadRequestException, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { FriendService } from './friend.service';
import { SessionGuard } from '../auth/guards/session.guard';
import { CurrentUserId } from '../auth/decorators/current-user-id.decorator';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';

@Controller('friend-requests')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post()
  @UseGuards(SessionGuard)
  createFriendRequest(@CurrentUserId() userId: string, @Body() dto: CreateFriendRequestDto) {
    return this.friendService.createFriendRequest(userId, dto.receiverId);
  }

  @Get()
  @UseGuards(SessionGuard)
  getFriendRequests(@CurrentUserId() userId: string) {
    return this.friendService.getFriendRequests(userId);
  }

  @Patch(':id')
  @UseGuards(SessionGuard)
  acceptFriendRequest(
    @CurrentUserId() userId: string,
    @Param('id', new ParseUUIDPipe({
      version: '4',
      exceptionFactory: () =>
        new BadRequestException({
          statusCode: 400,
          errors: [{ field: 'id', code: 'FRIEND_REQUEST_ID_INVALID' }],
        }),
    })) id: string,
  ) {
    return this.friendService.acceptFriendRequest(userId, id);
  }

  @Delete(':id')
  @UseGuards(SessionGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteFriendRequest(
    @CurrentUserId() userId: string,
    @Param('id', new ParseUUIDPipe({
      version: '4',
      exceptionFactory: () =>
        new BadRequestException({
          statusCode: 400,
          errors: [{ field: 'id', code: 'FRIEND_REQUEST_ID_INVALID' }],
        }),
    })) id: string,
  ) {
    return this.friendService.deleteFriendRequest(userId, id);
  }
}