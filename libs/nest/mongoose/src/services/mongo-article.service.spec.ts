import { Test, TestingModule } from '@nestjs/testing';

import { MongoArticleService } from './mongo-article.service';

describe('MongoArticleService', () => {
  let service: MongoArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoArticleService],
    }).compile();

    service = module.get<MongoArticleService>(MongoArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
