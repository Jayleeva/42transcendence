import { Controller, Post, UseGuards, Body } from '@nestjs/common';
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
}