import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/lib/db/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url:'postgresql://postgres:toper999@db.iuqwgpatnpizhrgffrlq.supabase.co:5432/postgres',
    },
});