ALTER TABLE "comments" ALTER COLUMN "authorId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "postId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "authorId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users_groups" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users_groups" ALTER COLUMN "groupId" SET NOT NULL;