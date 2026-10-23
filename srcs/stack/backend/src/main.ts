import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import type { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validate incoming request data using DTO rules.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,

      // Return structured error codes for frontend translation.
      exceptionFactory: (validationErrors: ValidationError[]) => {
        const errors = validationErrors.flatMap((error) =>
          Object.values(error.constraints ?? {}).map((code) => ({
            field: error.property,
            code,
          })),
        );

        return new BadRequestException({
          statusCode: 400,
          errors,
        });
      },
    }),
  );

  // Prefix all API routes with /api.
  app.setGlobalPrefix('api');

  // Allow the frontend to communicate with the backend.
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();