import { IsEmail, IsString, MinLength } from 'class-validator';

// Defines and validates the data accepted by POST /auth/register
export class RegisterDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}