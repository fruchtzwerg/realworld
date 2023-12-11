import { Test, TestingModule } from '@nestjs/testing';

import { MongoCommentService } from './mongo-comment.service';

describe('MongoCommentService', () => {
  let service: MongoCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoCommentService],
    }).compile();

    service = module.get<MongoCommentService>(MongoCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
