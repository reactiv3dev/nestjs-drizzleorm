import { integer, jsonb, pgTable, serial } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

 

export const profileInfo = pgTable("profile_info", {
    id: serial("id").primaryKey().notNull(),
    metadata: jsonb("metadata"),
    userId: integer("user_id").references(() => users.id)
})