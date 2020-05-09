import { UsersService } from './users.service';
import { Connection } from 'typeorm';
import { createMemDB } from '../utils/testing-helpers/createMemDB';
import { createUsersService } from '../utils/testing-helpers/commonServices';
import { createUser } from '../utils/testing-helpers/createUser';
import bcryptHelper from '../utils/bcrypt-helper';

describe('UsersService', () => {
  let db: Connection;
  let usersService: UsersService;

  beforeAll(async () => {
    db = await createMemDB();
    usersService = await createUsersService(db);
  });

  afterAll(() => db.close());

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should register and retrieve user', async () => {

    const user = createUser();

    const createdUser = await usersService.create(user);
    expect(createdUser.name).toBe(user.name);
    expect(createdUser.username).toBe(user.username);
    expect(createdUser.isActive).toBe(true);
    expect(await bcryptHelper.compare(user.password, createdUser.password)).toBe(true);
  });

});
