import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { relations } from "drizzle-orm";
import { comments } from "./comments.schema";

export const posts = pgTable("posts", {
    id: serial("id").primaryKey().notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    authorId: integer("authorId").references(() => users.id).notNull()
});

/***
 * @relations -> define so ORM could know about them
 */

export const postRelations  = relations(posts, ({ one, many }) => ({
    author: one(users, {
        fields: [posts.authorId],
        references: [users.id]
    }),
    comments: many(comments)
}))