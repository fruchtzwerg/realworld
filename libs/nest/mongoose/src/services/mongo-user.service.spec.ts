import { Test, TestingModule } from '@nestjs/testing';

import { MongoUserService } from './mongo-user.service';

describe('MongoUserService', () => {
  let service: MongoUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoUserService],
    }).compile();

    service = module.get<MongoUserService>(MongoUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
