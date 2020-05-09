import { PostsController } from './posts.controller';
import { Connection } from 'typeorm';
import { PostsService } from './posts.service';
import { createMemDB } from '../utils/testing-helpers/createMemDB';
import { createPostsService, createUsersService } from '../utils/testing-helpers/commonServices';
import { UsersService } from 'src/users/users.service';

describe('Posts Controller', () => {
  let db: Connection;
  let postsService: PostsService;
  let usersService: UsersService;
  let controller: PostsController;

  beforeAll(async () => {
    db = await createMemDB();
    postsService = await createPostsService(db);
    usersService = await createUsersService(db);
    controller = new PostsController(postsService, usersService);
  });

  afterAll(() => db.close());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
