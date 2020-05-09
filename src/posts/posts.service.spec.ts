import { PostsService } from './posts.service';
import { Connection } from 'typeorm';
import { createMemDB } from '../utils/testing-helpers/createMemDB';
import { createPostsService, createUsersService } from '../utils/testing-helpers/commonServices';
import { UsersService } from '../users/users.service';
import { createUser } from '../utils/testing-helpers/createUser';
import * as faker from 'faker';
import { Post } from './post.entity';

describe('PostsService', () => {
  let db: Connection;
  let postsService: PostsService;
  let usersService: UsersService;

  beforeEach(async () => {
    db = await createMemDB();
    postsService = await createPostsService(db);
    usersService = await createUsersService(db);
  });

  afterEach(() => db.close());

  it('should be defined', () => {
    expect(postsService).toBeDefined();
  });

  it('should create post', async () => {
    const user = await usersService.create(createUser());

    const post = new Post();
    post.user = user;
    post.text = faker.lorem.sentence();

    const createdPost = await postsService.create(post);

    expect(createdPost.text).toBe(post.text);
    expect(createdPost.user).toMatchObject(user);
  });

  it('should fail creating post without user', async () => {
    const post = new Post();
    post.text = faker.lorem.sentence();

    expect.assertions(1);

    try {
      await postsService.create(post);
    } catch (e) {
      expect(e).not.toBeNull();
    }
  });

  it('should get posts', async () => {
    const user = await usersService.create(createUser());
    
    const post = new Post();
    post.user = user;
    post.text = faker.lorem.sentence();

    await postsService.create(post);

    const anotherPost = new Post();
    anotherPost.user = user;
    anotherPost.text = faker.lorem.sentences();

    await postsService.create(anotherPost);

    const posts = await postsService.findAll();
    expect(posts.length).toBe(2);
  });

});
