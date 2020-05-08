import { Controller, Get, Post, Body, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginDto } from 'src/models/dto/login.dto';
import { Request } from 'express';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Post()
    async create(@Body() user: User) {
        const usernameAlreadyTaken = !!(await this.usersService.findByUsername(user.username));
        if (usernameAlreadyTaken) {
            throw new HttpException("Username already taken", HttpStatus.CONFLICT);
        }
        user.password = await this.authService.hashPassword(user.password);
        const createdUser = await this.usersService.create(user);
        const access_token = this.authService.getAccessToken(createdUser);
        delete createdUser.password;
        delete createdUser.id;
        return {
            user: createdUser,
            access_token
        }
    }

    @Post('/auth')
    async login(@Body() login: LoginDto) {
        const user = await this.usersService.findByUsername(login.username);
        if (!user) {
            throw new HttpException("Invalid username or password", HttpStatus.BAD_REQUEST);
        }
        const correctPassword = await this.authService.comparePasswords(login.password, user.password);
        if (!correctPassword) {
            throw new HttpException("Invalid username or password", HttpStatus.BAD_REQUEST);
        }
        const access_token = this.authService.getAccessToken(user);
        delete user.password;
        delete user.id;
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
