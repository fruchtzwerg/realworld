import { Test, TestingModule } from '@nestjs/testing';

import { AuthService, type JwtSigner, type UserService } from '@realworld/core';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useFactory: (signer: JwtSigner, userService: UserService) =>
            new AuthService(signer, userService),
          inject: ['JwtSigner', 'UserService'],
        },
        { provide: 'JwtSigner', useValue: { sign: async () => 'token' } satisfies JwtSigner },
        { provide: 'UserService', useValue: {} as unknown as UserService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
