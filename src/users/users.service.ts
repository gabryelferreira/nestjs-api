import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, Not } from 'typeorm';

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

    create(user: User): Promise<User> {
        return this.usersRepository.save(user);
    }
}
