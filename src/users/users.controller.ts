import { Controller, Get, Post, Body, HttpException, HttpStatus, UseGuards, Req, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LoginDTO } from '../models/dto/login.dto';
import { Request } from 'express';
import { CreateUserDTO } from '../models/dto/create-user.dto';
import bcryptHelper from '../utils/bcrypt-helper';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Post()
    async create(@Body() user: CreateUserDTO) {
        const usernameAlreadyTaken = !!(await this.usersService.findByUsername(user.username));
        if (usernameAlreadyTaken) {
            throw new HttpException("Username already taken", HttpStatus.CONFLICT);
        }
        const createdUser = await this.usersService.create(user);
        const access_token = this.authService.getAccessToken(createdUser);
        delete createdUser.password;
        return {
            user: createdUser,
            access_token
        }
    }

    @Post('/auth')
    @HttpCode(200)
    async login(@Body() login: LoginDTO) {
        const user = await this.usersService.findByUsername(login.username);
        if (!user) {
            throw new HttpException("Invalid username or password", HttpStatus.BAD_REQUEST);
        }
        const correctPassword = await bcryptHelper.compare(login.password, user.password);
        if (!correctPassword) {
            throw new HttpException("Invalid username or password", HttpStatus.BAD_REQUEST);
        }
        const access_token = this.authService.getAccessToken(user);
        delete user.password;
        return {
            user: user,
            access_token,
        }

    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUsers(@Req() request: Request) {
        const user = request.user as User;
        return this.usersService.findAllExcept(user.id);
    }

}
