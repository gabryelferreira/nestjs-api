import { PostsService } from './posts.service';
import { Connection } from 'typeorm';
import { createMemDB } from '../utils/testing-helpers/createMemDB';
import { createPostsService } from '../utils/testing-helpers/commonServices';

describe('PostsService', () => {
  let db: Connection;
  let postsService: PostsService;

  beforeAll(async () => {
    db = await createMemDB();
    postsService = await createPostsService(db);
  });

  afterAll(() => db.close());

  it('should be defined', () => {
    expect(postsService).toBeDefined();
  });
});
