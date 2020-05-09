import { Controller, Post, UseGuards, Body, Req, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Post as PostEntity } from './post.entity';
import { Request } from 'express';
import { User } from '../users/user.entity';
import { CreatePostDTO } from '../models/dto/post.dto';
import { UsersService } from '../users/users.service';

@Controller('posts')
export class PostsController {

    constructor(
        private readonly postsService: PostsService,
        private readonly usersService: UsersService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() request: Request, @Body() body: CreatePostDTO) {
        const user = request.user as User;
        const post = new PostEntity();
        post.text = body.text;
        post.user = user;
        const createdPost = await this.postsService.create(post);
        return createdPost;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getPosts() {
        return this.postsService.findAll();
    }

}
