import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validate all incoming request data using the rules defined in DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Only allow properties explicitly defined in the DTO.
      forbidNonWhitelisted: true, // Reject the request if it contains an unknown property
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
