import { index, integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { groups } from "./groups.schema";
import { relations } from "drizzle-orm";

/**
 * @JoinTable Users - to - Groups
 *  */ 

 
export const usersToGroups = pgTable("users_groups", {
    userId: integer("userId").references(() => users.id).notNull(),
    groupId: integer("groupId").references(() => groups.id).notNull()
    },
    (table) => ({
        pk: primaryKey({ columns: [table.userId, table.groupId]}),
        userIdIndex: index('userIdIndex').on(table.userId),
    })
);


export const usersToGroupsRelations = relations(usersToGroups, ({ one }) => ({
    user: one(users, {
        fields: [usersToGroups.userId],
        references: [users.id],
    }),
    group: one(groups, {
        fields: [usersToGroups.groupId],
        references: [groups.id]
    })
}))