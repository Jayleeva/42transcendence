import 'dotenv/config';
import { Injectable, OnModuleInit, InternalServerErrorException } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { getDatabaseUrlFromVault } from './vault';
import { Pool } from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit {
  // 1. On déclare le client de manière à ce que TypeScript sache qu'on peut y accéder directement
  [key: string]: any; 
  public client!: PrismaClient;
  private _adapter: PrismaPg | null = null;

  constructor() {
    // 2. Le Proxy intercepte les appels (ex: prismaService.user) et les redirige vers (prismaService.client.user)
    return new Proxy(this, {
      get: (target, prop) => {
        if (prop in target) {
          return target[prop as string];
        }
        if (target.client && prop in target.client) {
          const value = (target.client as any)[prop];
          if (typeof value === 'function') {
            return value.bind(target.client);
          }
          return value;
        }
        return undefined;
      },
    });
  }

  async onModuleInit() {
    try {
      console.log("🔑 [NestJS] Initialisation du PrismaService via Vault...");
      
      const databaseUrl = await getDatabaseUrlFromVault();

      const pool = new Pool({ connectionString: databaseUrl });
      this._adapter = new PrismaPg(pool);

      this.client = new PrismaClient({ adapter: this._adapter });

      await this.client.$connect();
      console.log("✅ [NestJS] Connexion à PostgreSQL établie nativement via Vault !");
    } catch (error) {
      console.error("❌ [NestJS] Échec critique de l'initialisation de PrismaPg :", error);
      throw new InternalServerErrorException("Database initialization failed");
    }
  }
}
