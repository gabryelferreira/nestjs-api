import { Controller, Post, UseGuards, Body, Req, Get } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Post as PostEntity } from './post.entity';
import { Request } from 'express';
import { User } from 'src/users/user.entity';
import { CreatePostDto } from 'src/models/dto/post.dto';
import { UsersService } from 'src/users/users.service';

@Controller('posts')
export class PostsController {

    constructor(
        private readonly postsService: PostsService,
        private readonly usersService: UsersService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() request: Request, @Body() body: CreatePostDto) {
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
