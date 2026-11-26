import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFriendRequestDto {
  @IsNotEmpty({ message: 'RECEIVER_ID_REQUIRED' })
  @IsUUID('4', { message: 'RECEIVER_ID_INVALID' })
  receiverId: string;
}