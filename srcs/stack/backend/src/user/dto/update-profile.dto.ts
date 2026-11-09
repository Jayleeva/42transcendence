import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  ValidateIf,
} from 'class-validator';

// Fields a user may change on their own profile. Email and birthDate are absent.
export class UpdateProfilDto {
  @ValidateIf((_, value) => value !== undefined)
  @IsString({ message: 'FIRSTNAME_INVALID_TYPE' })
  @IsNotEmpty({ message: 'FIRSTNAME_REQUIRED' })
  @MaxLength(50, { message: 'FIRSTNAME_TOO_LONG' })
  firstname?: string;

  @ValidateIf((_, value) => value !== undefined)
  @IsString({ message: 'LASTNAME_INVALID_TYPE' })
  @IsNotEmpty({ message: 'LASTNAME_REQUIRED' })
  @MaxLength(50, { message: 'LASTNAME_TOO_LONG' })
  lastname?: string;

  @ValidateIf((_, value) => value !== undefined)
  @IsString({ message: 'USERNAME_INVALID_TYPE' })
  @IsNotEmpty({ message: 'USERNAME_REQUIRED' })
  @Length(3, 20, { message: 'USERNAME_INVALID_LENGTH' })
  @Matches(/^[a-zA-Z0-9_-]+$/, { message: 'USERNAME_INVALID_FORMAT' })
  username?: string;

  @IsOptional()
  @IsString({ message: 'BIO_INVALID_TYPE' })
  @MaxLength(300, { message: 'BIO_TOO_LONG' })
  bio?: string;

  @IsOptional()
  @IsString({ message: 'AVATAR_INVALID_TYPE' })
  @MaxLength(255, { message: 'AVATAR_TOO_LONG' })
  avatar?: string;
}
