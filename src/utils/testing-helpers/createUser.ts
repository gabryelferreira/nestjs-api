import * as faker from 'faker';
import { CreateUserDTO } from "../../models/dto/create-user.dto";

export function createUser(user: CreateUserDTO = new CreateUserDTO()): CreateUserDTO {
    return {
        name: user.name || faker.name.findName(),
        username: user.username || faker.internet.userName(),
        password: user.password || faker.internet.password()
    }
}