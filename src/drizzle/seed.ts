import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from './schema/index';
import "dotenv/config"
import { faker } from "@faker-js/faker";

const pool = new Pool({ connectionString: process.env.POSTGRES_URL, ssl: true });

const db =  drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;


async function main() {

    await db.delete(schema.usersToGroups);
    await db.delete(schema.users);
    await db.delete(schema.posts);
    await db.delete(schema.comments);
    await db.delete(schema.groups);

    const userIds = await Promise.all(
        Array(50).fill(null).map(async (_, index) => {
            const user = await db.insert(schema.users).values({
                email: faker.internet.email(),
                name: faker.person.fullName(),
                password: faker.internet.password(),
            }).returning()

            return user[0].id
        })
    )

    const postIds = await Promise.all(
        Array(50).fill(null).map( async (_, index) => {
            const post = await db.insert(schema.posts).values({
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraph(),
                authorId: faker.helpers.arrayElement(userIds),
            }).returning()

            return post[0].id;
        })
    )

    const commentIds = await Promise.all(
        Array(50).fill(null).map(async(_) => {
            const comment = await db.insert(schema.comments).values({
                text: faker.lorem.sentence(),
                authorId: faker.helpers.arrayElement(userIds) ,
                postId: faker.helpers.arrayElement(postIds),
            }).returning();

            return comment[0].id
        })
    )

    const insertedGroups = await db.insert(schema.groups).values([
        {
            name: "JS ninjas"
        },
        {
            name: "TS typescript masters"
        }
    ]).returning()

    const groupIds = insertedGroups.map(group => group.id);

    await Promise.all(
        userIds.map(async( userId) => {
            return await db.insert(schema.usersToGroups).values({
                userId,
                groupId: faker.helpers.arrayElement(groupIds)
            })
        })
    )
}

main()
    .then()
    .catch((err) => {
        console.log(err)
        process.exit(0)
    })