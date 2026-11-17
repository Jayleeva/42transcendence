import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'username can only contain letters, digits, _ and -',
  })
  username: string;

  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @Matches(/^[\p{L}\p{M}'\- ]+$/u, {
    //\p{L} = Toutes les lettre de tout les aplhabet
    message: 'firstname can only contain letters',
  })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  @Matches(/^[\p{L}\p{M}'\- ]+$/u, {
    message: 'lastname can only contain letters',
  })
  lastname: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;
}
