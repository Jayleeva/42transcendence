import {
  Injectable,
  BadRequestException,
  NotFoundException, ConflictException, ForbiddenException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Status } from '../generated/prisma/client';

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
    try {
      return await this.prisma.friendship.create({
        data: {
          requesterId,
          receiverId,
          status: Status.PENDING,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException({
          statusCode: 409,
          errors: [{ code: 'FRIENDSHIP_ALREADY_EXISTS' }],
        });
      }

      throw error;
    }
  }

  async getFriendRequests(userId: string) {
    // Retrieve pending received friend requests
    const received = await this.prisma.friendship.findMany({
      where: {
        receiverId: userId,
        status: Status.PENDING,
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        requester: {
          select: {
            id: true,
            username: true,
            firstname: true,
            lastname: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Retrieve pending sent friend requests
    const sent = await this.prisma.friendship.findMany({
      where: {
        requesterId: userId,
        status: Status.PENDING,
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        receiver: {
          select: {
            id: true,
            username: true,
            firstname: true,
            lastname: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { received, sent };
  }

  async acceptFriendRequest(userId: string, friendshipId: string) {
    // Check if the friend request exists
    const friendship = await this.prisma.friendship.findUnique({
      where: {
        id: friendshipId,
      },
    });

    if (!friendship) {
      throw new NotFoundException({
        statusCode: 404,
        errors: [{ code: 'FRIEND_REQUEST_NOT_FOUND' }],
      });
    }

    // Only the receiver can accept the friend request
    if (friendship.receiverId !== userId) {
      throw new ForbiddenException({
        statusCode: 403,
        errors: [{ code: 'FRIEND_REQUEST_FORBIDDEN' }],
      });
    }

    // Check if the friend request is still pending
    if (friendship.status !== Status.PENDING) {
      throw new ConflictException({
        statusCode: 409,
        errors: [{ code: 'FRIEND_REQUEST_NOT_PENDING' }],
      });
    }

    // Accept the pending friend request
    try {
      return await this.prisma.friendship.update({
        where: {
          id: friendshipId,
          receiverId: userId,
          status: Status.PENDING,
        },
        data: {
          status: Status.ACCEPTED,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new ConflictException({
          statusCode: 409,
          errors: [{ code: 'FRIEND_REQUEST_NO_LONGER_PENDING' }],
        });
      }

      throw error;
    }
  }

  async deleteFriendRequest(userId: string, friendshipId: string) {
    // Check if the friend request exists
    const friendship = await this.prisma.friendship.findUnique({
      where: {
        id: friendshipId,
      },
    });

    if (!friendship) {
      throw new NotFoundException({
        statusCode: 404,
        errors: [{ code: 'FRIEND_REQUEST_NOT_FOUND' }],
      });
    }

    // Only the requester or receiver can delete the friend request
    if (friendship.requesterId !== userId && friendship.receiverId !== userId) {
      throw new ForbiddenException({
        statusCode: 403,
        errors: [{ code: 'FRIEND_REQUEST_FORBIDDEN' }],
      });
    }

    // Check if the friend request is still pending
    if (friendship.status !== Status.PENDING) {
      throw new ConflictException({
        statusCode: 409,
        errors: [{ code: 'FRIEND_REQUEST_NOT_PENDING' }],
      });
    }

    // Delete the pending friend request
    try {
      await this.prisma.friendship.delete({
        where: {
          id: friendshipId,
          status: Status.PENDING,
          OR: [
            { requesterId: userId },
            { receiverId: userId },
          ],
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new ConflictException({
          statusCode: 409,
          errors: [{ code: 'FRIEND_REQUEST_NO_LONGER_PENDING' }],
        });
      }

      throw error;
    }
  }

  async getFriends(userId: string) {
    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException({
        statusCode: 404,
        errors: [{ code: 'USER_NOT_FOUND' }],
      });
    }

    // Retrieve accepted friendships where the user is either the requester or receiver
    const friendships = await this.prisma.friendship.findMany({
      where: {
        status: Status.ACCEPTED,
        OR: [
          { requesterId: userId },
          { receiverId: userId },
        ],
      },
      select: {
        requester: {
          select: {
            id: true,
            username: true,
            firstname: true,
            lastname: true,
            avatar: true,
          },
        },
        receiver: {
          select: {
            id: true,
            username: true,
            firstname: true,
            lastname: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Extract the other user from each friendship
    const friends = friendships.map((friendship) => {
      if (friendship.requester.id === user.id) {
        return friendship.receiver;
      }

      return friendship.requester;
    });

    return friends;
  }

  async removeFriend(userId: string, friendId: string) {
    // Find an accepted friendship between both users
    const existingFriendship = await this.prisma.friendship.findFirst({
      where: {
        status: Status.ACCEPTED,
        OR: [
          { requesterId: userId, receiverId: friendId },
          { requesterId: friendId, receiverId: userId },
        ],
      },
    });

    if (!existingFriendship) {
      throw new NotFoundException({
        statusCode: 404,
        errors: [{ code: 'FRIENDSHIP_NOT_FOUND' }],
      });
    }

    // Remove the accepted friendship
    try {
      await this.prisma.friendship.delete({
        where: {
          id: existingFriendship.id,
          status: Status.ACCEPTED,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException({
          statusCode: 404,
          errors: [{ code: 'FRIENDSHIP_NOT_FOUND' }],
        });
      }

      throw error;
    }
  }
}