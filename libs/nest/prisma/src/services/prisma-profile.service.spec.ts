import { Test, TestingModule } from '@nestjs/testing';

import { PrismaProfileService } from './prisma-profile.service';

describe('PrismaProfileService', () => {
  let service: PrismaProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaProfileService],
    }).compile();

    service = module.get<PrismaProfileService>(PrismaProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
