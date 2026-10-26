import { Injectable, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // On injecte le pool pour pouvoir le fermer proprement à la fin
  constructor(
    @Inject('PRISMA_POSTGRES_POOL') private readonly pool: Pool,
    @Inject('PRISMA_ADAPTER') adapter: PrismaPg,
  ) {
    // On passe directement l'adaptateur au constructeur parent. 
    // TypeScript est content : l'argument requis est fourni !
    super({ adapter });
  }

  async onModuleInit() {
    console.log("🔌 [NestJS] Connexion à PostgreSQL en cours...");
    await this.$connect();
    console.log("✅ [NestJS] Connexion à PostgreSQL établie avec succès !");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    if (this.pool) {
      await this.pool.end();
      console.log("💤 [NestJS] Connexion PostgreSQL fermée proprement.");
    }
  }
}
