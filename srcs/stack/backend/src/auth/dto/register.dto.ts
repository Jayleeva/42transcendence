import { IsEmail, IsString, MinLength } from 'class-validator';

// Defines and validates the data accepted by POST /auth/register
export class RegisterDto {
  @IsString()
  @MinLength(1)
  firstname: string;

  @IsString()
  @MinLength(1)
  lastname: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}