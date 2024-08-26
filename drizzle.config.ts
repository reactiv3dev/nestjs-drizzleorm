import "dotenv/config"
import { defineConfig, Config } from 'drizzle-kit';



export default defineConfig({
    schema: './src/drizzle/schema/**.schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.POSTGRES_URL
    },
    out: './src/drizzle/migrations'
})


/**
 * @migrations_generate npx drizzle-kit generate
 * 
 * @push_migrations_to_db npx drizzle-kit migrate
 */