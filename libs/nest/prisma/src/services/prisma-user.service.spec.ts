import { Test, TestingModule } from '@nestjs/testing';

import { PrismaUserService } from './prisma-user.service';

describe('PrismaUserService', () => {
  let service: PrismaUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaUserService],
    }).compile();

    service = module.get<PrismaUserService>(PrismaUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
