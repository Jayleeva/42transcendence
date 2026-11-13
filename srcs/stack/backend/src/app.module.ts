import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PetModule } from './pet/pet.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, PetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
