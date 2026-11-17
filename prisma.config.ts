import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    // Not env() from prisma/config: it throws when the variable is missing,
    // which would break `prisma generate` in a Docker build without a database URL.
    url: process.env.DATABASE_URL,
  },
});
