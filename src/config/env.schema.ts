import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  DATABASE_URL: z.url({ protocol: /^postgres(ql)?$/ }),
  PROFILE_SLUG: z.string().min(1),
  // Not z.coerce.boolean(): it calls Boolean(value), so the string "false" becomes true.
  GRAPHQL_SANDBOX_ENABLED: z.stringbool().default(false),
  SEED_FORCE: z.stringbool().default(false),
});

export type Env = z.infer<typeof envSchema>;
