import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'FIRSTNAME_INVALID_TYPE' })
  @IsNotEmpty({ message: 'FIRSTNAME_REQUIRED' })
  @MaxLength(50, { message: 'FIRSTNAME_TOO_LONG' })
  firstname: string;

  @IsString({ message: 'LASTNAME_INVALID_TYPE' })
  @IsNotEmpty({ message: 'LASTNAME_REQUIRED' })
  @MaxLength(50, { message: 'LASTNAME_TOO_LONG' })
  lastname: string;

  @IsString({ message: 'USERNAME_INVALID_TYPE' })
  @IsNotEmpty({ message: 'USERNAME_REQUIRED' })
  @Length(3, 20, { message: 'USERNAME_INVALID_LENGTH' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'USERNAME_INVALID_FORMAT',
  })
  username: string;

  @IsEmail({}, { message: 'EMAIL_INVALID_FORMAT' })
  @IsNotEmpty({ message: 'EMAIL_REQUIRED' })
  email: string;

  @IsString({ message: 'PASSWORD_INVALID_TYPE' })
  @IsNotEmpty({ message: 'PASSWORD_REQUIRED' })
  @MinLength(8, { message: 'PASSWORD_TOO_SHORT' })
  @MaxLength(128, { message: 'PASSWORD_TOO_LONG' })
  password: string;
}