import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema/index';

export const DRIZZLE = Symbol("drizzle-connection")

@Module({
    providers: [
        {
            provide: DRIZZLE,
            inject: [ConfigService],
            useFactory: async(configService: ConfigService) => {
                const postgresUrl = configService.get<string>("POSTGRES_URL");
                const pool = new Pool({ connectionString: postgresUrl, ssl: true });

                return  drizzle(pool, { schema }) as NodePgDatabase<typeof schema>
            }
        }
    ],
    exports: [DRIZZLE]
})
export class DrizzleModule {}