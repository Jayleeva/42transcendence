import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  PayloadTooLargeException,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch(BadRequestException, PayloadTooLargeException)
export class UploadExceptionFilter implements ExceptionFilter {
  constructor(private readonly field: string) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const body = exception.getResponse();

    if (typeof body === 'object' && 'errors' in body) {
      return res.status(status).json(body);
    }

    const code = status === 413 ? 'FILE_TOO_LARGE' : 'INVALID_UPLOAD';
    res.status(status).json({
      statusCode: status,
      errors: [{ field: this.field, code }],
    });
  }
}
