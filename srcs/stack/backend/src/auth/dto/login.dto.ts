import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'EMAIL_INVALID_FORMAT' })
  @IsNotEmpty({ message: 'EMAIL_REQUIRED' })
  email: string;

  @IsString({ message: 'PASSWORD_INVALID_TYPE' })
  @IsNotEmpty({ message: 'PASSWORD_REQUIRED' })
  password: string;
}