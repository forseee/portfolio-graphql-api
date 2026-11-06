import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import type { Env } from '../config/env.schema';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService<Env, true>) {
    const isDev = config.get('NODE_ENV', { infer: true }) === 'development';

    super({
      adapter: new PrismaPg({
        connectionString: config.get('DATABASE_URL', { infer: true }),
        // pg waits forever by default; without this, an unreachable database
        // hangs startup until the OS TCP timeout instead of failing fast.
        connectionTimeoutMillis: 5_000,
      }),
      // Queries are logged in development to make N+1 queries visible;
      // warnings and errors are logged in every environment.
      log: isDev ? ['query', 'warn', 'error'] : ['warn', 'error'],
    });
  }

  async onModuleInit() {
    // $connect() does not open a connection with driver adapters (the pool is lazy),
    // so a real query is needed to fail at startup when the database is unreachable.
    await this.$queryRaw`SELECT 1`;
  }

  async onModuleDestroy() {
    // The adapter owns the pool it created from connectionString,
    // so $disconnect() closes it.
    await this.$disconnect();
  }
}
