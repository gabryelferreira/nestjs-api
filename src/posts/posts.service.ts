import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>
    ) { }

    create(post: Post): Promise<Post> {
        return this.postsRepository.save(post);
    }

    getPostsByUserId(id: number): Promise<Post[]> {
        return this.postsRepository.find({
            where: {
                user: { id }
            }
        })
    }

    findAll(): Promise<Post[]> {
        return this.postsRepository.createQueryBuilder("post")
            .select([
                "post.id",
                "post.text",
                "post.created_at",
                "post.updated_at",
                "user.id",
                "user.name",
                "user.username"
            ])
            .innerJoin("post.user", "user")
            .getMany();
    }

}
