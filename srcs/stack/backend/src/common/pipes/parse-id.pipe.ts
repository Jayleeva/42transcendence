import { BadRequestException, ParseUUIDPipe } from '@nestjs/common';

// ParseUUIDPipe with the team's error format, for any :id param
export const parseId = new ParseUUIDPipe({
  exceptionFactory: () =>
    new BadRequestException({
      statusCode: 400,
      errors: [{ field: 'id', code: 'ID_INVALID_FORMAT' }],
    }),
});
