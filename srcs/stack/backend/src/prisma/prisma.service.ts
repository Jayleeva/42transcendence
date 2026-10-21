import 'dotenv/config';
import { Injectable, OnModuleInit, OnModuleDestroy, InternalServerErrorException } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { getDatabaseUrlFromVault } from './vault';
import { Pool } from 'pg';

@Injectable()
// 1. On ré-étend PrismaClient pour que TypeScript expose TOUS les types (user, post, etc.) automatiquement
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private pool!: Pool;

  constructor() {
    // 2. On appelle le constructeur parent à vide. 
    // On ne lui passe pas encore l'adapter car l'URL de Vault est asynchrone.
    super();
  }

  async onModuleInit() {
    try {
      console.log("🔑 [NestJS] Initialisation du PrismaService via Vault...");
      
      // Récupération de l'URL depuis Vault
      const databaseUrl = await getDatabaseUrlFromVault();

      // Configuration du pool pg
      this.pool = new Pool({ connectionString: databaseUrl });
      const adapter = new PrismaPg(this.pool);

      // 3. On injecte l'adaptateur et la configuration dynamiquement dans l'instance existante
      // (PrismaClient permet de réassigner ses composants internes avant la première requête)
      Object.assign(this, new PrismaClient({ adapter }));

      // Connexion effective
      await this.$connect();
      console.log("✅ [NestJS] Connexion à PostgreSQL établie nativement via Vault !");
    } catch (error) {
      console.error("❌ [NestJS] Échec critique de l'initialisation de PrismaPg :", error);
      throw new InternalServerErrorException("Database initialization failed");
    }
  }

  // 4. Bonne pratique : On ferme le pool et la connexion à l'arrêt du backend
  async onModuleDestroy() {
    await this.$disconnect();
    if (this.pool) {
      await this.pool.end();
    }
  }
}
