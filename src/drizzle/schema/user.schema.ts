import { relations } from "drizzle-orm";
import {  pgTable, serial, text } from "drizzle-orm/pg-core";
import { posts } from "./post.schema";
import { comments } from "./comments.schema";
import { profileInfo } from "./profile-info.schema";
import { usersToGroups } from "./users-to-groups.schema";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
})


export const usersRelations = relations(users, ({ one, many }) => ({
    profileInfo: one(profileInfo),
    posts: many(posts),
    comments: many(comments),    
    usersToGroups: many(usersToGroups)
}));