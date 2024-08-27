import { relations } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { usersToGroups } from "./users-to-groups.schema";

export const groups = pgTable("groups", {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull()
})


export const groupsRelations = relations(groups, ({ many }) => ({
    usersToGroups: many(usersToGroups)
}))

