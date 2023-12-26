import { Test, TestingModule } from '@nestjs/testing';

import { PrismaCommentService } from './prisma-comment.service';

describe('PrismaCommentService', () => {
  let service: PrismaCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaCommentService],
    }).compile();

    service = module.get<PrismaCommentService>(PrismaCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
