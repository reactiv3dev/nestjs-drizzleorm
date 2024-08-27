 
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { posts } from "./post.schema";
import { relations } from "drizzle-orm";

export const comments = pgTable("comments", {
    id: serial('id').primaryKey().notNull(),
    text: text('text').notNull(),
    authorId: integer('authorId').references(() => users.id).notNull(),
    postId: integer('postId').references(() => posts.id).notNull()
})



export const commentsRelations = relations(comments, ({ one, many }) => ({
    post: one(posts, {
        fields: [comments.postId],
        references: [posts.id]
    }),
    author: one(users, {
        fields: [comments.authorId],
        references: [users.id]
    })
}))