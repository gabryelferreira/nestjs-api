import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, Not } from 'typeorm';
import { CreateUserDTO } from '../models/dto/create-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) { }

    findAllExcept(id: number): Promise<User[]> {
        return this.usersRepository.find({
            where: { id: Not(id) },
            relations: ["posts"],
            select: ["id", "name", "username"]
        });
    }

    findByUsername(username: string): Promise<User> {
        return this.usersRepository.findOne({
            where: {
                username
            }
        });
    }

    findById(id: number): Promise<User> {
        return this.usersRepository.findOne({
            where: {
                id
            }
        });
    }

    create(user: CreateUserDTO): Promise<User> {
        const entity = Object.assign(new User(), user);
        return this.usersRepository.save(entity);
    }
}
