import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { Pool } from 'pg';
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
  // Retrieve the PostgreSQL pool initialized through Vault.
  const pool = app.get<Pool>('PRISMA_POSTGRES_POOL');

  // Create a PostgreSQL-backed session store.
  const PgSession = connectPgSimple(session);

  const sessionStore = new PgSession({
    pool,
    tableName: 'session',
    createTableIfMissing: true,
  });

  // Trust our Nginx reverse proxy for HTTPS requests.
  app.getHttpAdapter().getInstance().set('trust proxy', 1);

  // Enable PostgreSQL-backed sessions.
  const sessionSecret = process.env.SESSION_SECRET;

  if (!sessionSecret || sessionSecret.length < 32) {
    throw new Error('SESSION_SECRET must contain at least 32 characters');
  }

  app.use(
    session({
      store: sessionStore,
      name: 'transcendence.sid',
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
  );

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