import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { getDatabaseUrlFromVault } from './vault';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Global()
@Module({
  providers: [
    // 1. Provider asynchrone pour le Pool PG basé sur Vault
    {
      provide: 'PRISMA_POSTGRES_POOL',
      useFactory: async () => {
        console.log("🔑 [NestJS] Récupération de l'URL depuis Vault...");
        const databaseUrl = await getDatabaseUrlFromVault();
        return new Pool({ connectionString: databaseUrl });
      },
    },
    // 2. Provider pour l'adaptateur Prisma
    {
      provide: 'PRISMA_ADAPTER',
      useFactory: (pool: Pool) => {
        return new PrismaPg(pool);
      },
      inject: ['PRISMA_POSTGRES_POOL'],
    },
    // 3. Notre PrismaService finalisé
    PrismaService,
  ],
  exports: [PrismaService, 'PRISMA_POSTGRES_POOL'],
})
export class PrismaModule {}
