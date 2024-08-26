 
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./user.schema";
import { posts } from "./post.schema";

export const comments = pgTable("comments", {
    id: serial('id').primaryKey().notNull(),
    text: text('text').notNull(),
    authorId: integer('author_id').references(() => users.id),
    postId: integer('post_id').references(() => posts.id)
})