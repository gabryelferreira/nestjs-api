import * as dotenv from 'dotenv';
dotenv.config();
import { AuthService } from "../../auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { Connection } from "typeorm";
import { User } from "../../users/user.entity";
import { UsersService } from "../../users/users.service";
import { PostsService } from "../../posts/posts.service";
import { Post } from "../../posts/post.entity";
import { request } from 'express';

const jwtService = new JwtService({
    secret: process.env.JWT_SECRET
});

export const commonAuthService = new AuthService(jwtService);

export const createUsersService = async (db: Connection) => {
    const usersRepository = await db.getRepository(User);
    return new UsersService(usersRepository);
}

export const createPostsService = async (db: Connection) => {
    const postsRepository = await db.getRepository(Post);
    return new PostsService(postsRepository);
}

export const createCommonRequest = (user?: User) => {
    const req = request;
    req.user = user;
    return req;
}