import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { Species } from '../../generated/prisma/enums';

export class CreatePetDto {
  @IsString({ message: 'NAME_INVALID_TYPE' })
  @IsNotEmpty({ message: 'NAME_REQUIRED' })
  @MaxLength(30, { message: 'NAME_TOO_LONG' })
  name: string;

  @IsEnum(Species, { message: 'SPECIES_INVALID' })
  species: Species;

  @IsOptional()
  @IsString({ message: 'RACE_INVALID_TYPE' })
  @MaxLength(50, { message: 'RACE_TOO_LONG' })
  race?: string;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'BIRTHDATE_INVALID_FORMAT' })
  @IsDateString({ strict: true }, { message: 'BIRTHDATE_INVALID_FORMAT' })
  birthDate?: string;

  @IsOptional()
  @IsString({ message: 'BIO_INVALID_TYPE' })
  @MaxLength(300, { message: 'BIO_TOO_LONG' })
  bio?: string;
}
