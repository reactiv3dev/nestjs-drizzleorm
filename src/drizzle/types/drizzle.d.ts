import { NodePgDatabase } from "drizzle-orm/node-postgres"
import * as schema from '../schema/index';


export type DrizzleDB =  NodePgDatabase<typeof schema> 