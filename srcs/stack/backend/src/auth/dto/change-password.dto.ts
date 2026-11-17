import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class ChangePasswordDto {
  @IsString({ message: 'CURRENT_PASSWORD_INVALID_TYPE' })
  @IsNotEmpty({ message: 'CURRENT_PASSWORD_REQUIRED' })
  currentPassword: string;

  @IsString({ message: 'PASSWORD_INVALID_TYPE' })
  @IsNotEmpty({ message: 'PASSWORD_REQUIRED' })
  @MinLength(8, { message: 'PASSWORD_TOO_SHORT' })
  @MaxLength(128, { message: 'PASSWORD_TOO_LONG' })
  newPassword: string;
}