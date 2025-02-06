import { defineConfig } from 'drizzle-kit';

import { env } from '@/env';

export default env.DB_LOCAL_PATH
  ? defineConfig({
      schema: './src/server/db/schema.js',
      dialect: 'sqlite',
      dbCredentials: {
        url: env.DB_LOCAL_PATH,
      },
    })
  : defineConfig({
      schema: './src/server/db/schema.js',
      out: './migrations',
      driver: 'd1-http',
      dialect: 'sqlite',
      dbCredentials: {
        accountId: env.CLOUDFLARE_ACCOUNT_ID,
        token: env.CLOUDFLARE_API_TOKEN,
        databaseId: env.DB_REMOTE_DATABASE_ID,
      },
    });
