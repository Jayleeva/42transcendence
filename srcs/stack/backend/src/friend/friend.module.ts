import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { FriendController } from './friend-requests.controller';
import { FriendService } from './friend.service';
import { FriendsController } from './friends.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FriendController, FriendsController],
  providers: [FriendService],
})
export class FriendModule {}