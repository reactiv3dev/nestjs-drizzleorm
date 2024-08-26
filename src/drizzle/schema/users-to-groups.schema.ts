import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { groups } from "./groups.schema";

/**
 * @JoinTable Users - to - Groups
 *  */ 

 
export const usersToGroups = pgTable("users_groups", {
    userId: integer("user_id").references(() => users.id),
    groupId: integer("group_id").references(() => groups.id)
},
(table) => ({
    pk: primaryKey({ columns: [table.userId, table.groupId]})
})
);