import {
  Injectable,
  BadRequestException,
  NotFoundException, ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Status } from '../generated/prisma/client';

@Injectable()
export class FriendService {
  constructor(private readonly prisma: PrismaService) {}

  async createFriendRequest(requesterId: string, receiverId: string) {
    // Prevent users from sending friend requests to themselves
    if (requesterId.toLowerCase() === receiverId.toLowerCase()) {
      throw new BadRequestException({
        statusCode: 400,
        errors: [{ field: 'receiverId', code: 'CANNOT_FRIEND_YOURSELF' }],
      });
    }

    // Check if the receiver exists
    const receiver = await this.prisma.user.findUnique({
      where: { id: receiverId },
      select: { id: true },
    });

    if (!receiver) {
      throw new NotFoundException({
        statusCode: 404,
        errors: [{ field: 'receiverId', code: 'USER_NOT_FOUND' }],
      });
    }

    // Check for an existing relationship in either direction
    const existingFriendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { requesterId, receiverId },
          { requesterId: receiverId, receiverId: requesterId },
        ],
      },
    });

    if (existingFriendship) {
      if (existingFriendship.status === Status.ACCEPTED) {
        throw new ConflictException({
          statusCode: 409,
          errors: [{ code: 'ALREADY_FRIENDS' }],
        });
      }

      if (existingFriendship.status === Status.PENDING) {
        throw new ConflictException({
          statusCode: 409,
          errors: [{ code: 'FRIEND_REQUEST_ALREADY_EXISTS' }],
        });
      }

      throw new ConflictException({
        statusCode: 409,
        errors: [{ code: 'FRIENDSHIP_ALREADY_EXISTS' }],
      });
    }

    // Create a pending friend request
    return this.prisma.friendship.create({
      data: {
        requesterId,
        receiverId,
        status: Status.PENDING,
      },
    });
  }
}