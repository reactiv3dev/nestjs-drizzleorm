import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const groups = pgTable("groups", {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull()
})