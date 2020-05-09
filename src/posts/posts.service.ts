import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post)
        private readonly postsRepository: Repository<Post>
    ) { }

    create(post: Post): Promise<Post> {
        const entity = Object.assign(new Post(), post);
        return this.postsRepository.save(entity);
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
