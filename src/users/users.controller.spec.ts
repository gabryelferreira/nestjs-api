import { UsersController } from './users.controller';
import { Connection } from 'typeorm';
import { UsersService } from './users.service';
import { createMemDB } from '../utils/testing-helpers/createMemDB';
import { AuthService } from '../auth/auth.service';
import { commonAuthService, createUsersService, createCommonRequest } from '../utils/testing-helpers/commonServices';
import { createUser } from '../utils/testing-helpers/createUser';

describe('Users Controller', () => {
  let db: Connection;
  let usersController: UsersController;
  let usersService: UsersService;
  let authService: AuthService;

  beforeEach(async () => {
    db = await createMemDB();
    usersService = await createUsersService(db);
    authService = commonAuthService;
    usersController = new UsersController(usersService, authService);
  });

  afterEach(() => db.close());

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should create user', async () => {

    const user = createUser();

    const result = await usersController.create(user);
    expect(result.user.id).toBe(1);
    expect(result.user.name).toBe(user.name);
    expect(result.user.username).toBe(user.username);
    expect(result.user.password).toBeUndefined();
  });

  it("should retrieve users except me", async () => {
    const myUser = await usersService.create(createUser());
    const anotherUser = await usersService.create(createUser());

    const request = createCommonRequest(myUser);

    const result = await usersController.getUsers(request);
    expect(!!result.find(user => user.name === myUser.name)).toBeFalsy();
    expect(result.find(user => user.username === anotherUser.username)).toBeTruthy();
  });
});
