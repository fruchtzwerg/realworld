import { Test, TestingModule } from '@nestjs/testing';

import { MongoProfileService } from './mongo-profile.service';

describe('MongoProfileService', () => {
  let service: MongoProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoProfileService],
    }).compile();

    service = module.get<MongoProfileService>(MongoProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
