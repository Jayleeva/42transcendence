import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

// Query parameters for GET /api/users
export class SearchUserDto {
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'SEARCH_INVALID_TYPE' })
  @MaxLength(50, { message: 'SEARCH_TOO_LONG' })
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'TAKE_INVALID_TYPE' })
  @Min(1, { message: 'TAKE_TOO_SMALL' })
  @Max(50, { message: 'TAKE_TOO_LARGE' })
  take: number = 20;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'SKIP_INVALID_TYPE' })
  @Min(0, { message: 'SKIP_NEGATIVE' })
  skip: number = 0;
}
