import { PostsController } from './posts.controller';
import { Connection } from 'typeorm';
import { PostsService } from './posts.service';
import { createMemDB } from '../utils/testing-helpers/createMemDB';
import { createPostsService, createUsersService, createCommonRequest } from '../utils/testing-helpers/commonServices';
import { UsersService } from '../users/users.service';
import { createUser } from '../utils/testing-helpers/createUser';
import * as faker from 'faker';
import { CreatePostDTO } from '../models/dto/post.dto';

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

  it('should create post', async () => {
    const user = await usersService.create(createUser());

    const post: CreatePostDTO = {
      text: faker.lorem.sentences()
    };

    const request = createCommonRequest(user);

    const result = await controller.create(request, post);
    expect(result.text).toBe(post.text);
  });

  it('should fail creating post without user', async () => {
    const post: CreatePostDTO = {
      text: faker.lorem.sentences()
    };
    expect.assertions(1);

    const request = createCommonRequest();

    try {
      await controller.create(request, post);
    } catch (e) {
      expect(e).not.toBeNull();
    }
  });

});
