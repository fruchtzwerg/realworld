import { Test, TestingModule } from '@nestjs/testing';

import { PrismaArticleService } from './prisma-article.service';

describe('PrismaArticleService', () => {
  let service: PrismaArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaArticleService],
    }).compile();

    service = module.get<PrismaArticleService>(PrismaArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
