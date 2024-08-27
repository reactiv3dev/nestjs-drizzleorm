import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { posts, groups } from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PostService {

  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDB){}

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAll() {
    //return  await this.db.select().from(posts).limit(10);
    return await this.db.query.posts.findMany({ 
      with: 
        { author: { 
            with: 
            { 
              usersToGroups: 
              {
                with: { 
                  group: true 
                },
                where: (groups, {eq}) => eq(groups.name, "JS ninjas"),
              }
            }}, 
            comments: true,
           },
           
           limit: 10 
          });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: number) {
    return await this.db.delete(posts).where(eq(posts.id, id));
  }
}
