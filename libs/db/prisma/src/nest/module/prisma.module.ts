import { DynamicModule, Module, Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import {
  ArticleRepository,
  CommentRepository,
  ProfileRepository,
  UserRepository,
  ArticleValidator,
  CommentValidator,
  ProfileValidator,
  UserValidator,
} from '@realworld/core';

import {
  PrismaArticleRepository,
  PrismaArticleValidator,
  PrismaCommentRepository,
  PrismaCommentValidator,
  PrismaProfileRepository,
  PrismaProfileValidator,
  PrismaUserRepository,
  PrismaUserValidator,
} from '../../adapters';
import type { ExtendedPrismaClient } from '../../factories/prisma.factory';
import { PrismaClientExceptionFilter } from '../filters/prisma-client-exception.filter';
import { PRISMA, PrismaClientFactory } from '../providers/prisma.provider';

const providers: Provider[] = [
  {
    provide: ArticleRepository,
    useFactory: (prisma: ExtendedPrismaClient) => new PrismaArticleRepository(prisma),
    inject: [PRISMA],
  },
  { provide: ArticleValidator, useClass: PrismaArticleValidator },
  {
    provide: CommentRepository,
    useFactory: (prisma: ExtendedPrismaClient) => new PrismaCommentRepository(prisma),
    inject: [PRISMA],
  },
  { provide: CommentValidator, useClass: PrismaCommentValidator },
  {
    provide: ProfileRepository,
    useFactory: (prisma: ExtendedPrismaClient) => new PrismaProfileRepository(prisma),
    inject: [PRISMA],
  },
  { provide: ProfileValidator, useClass: PrismaProfileValidator },
  {
    provide: UserRepository,
    useFactory: (prisma: ExtendedPrismaClient) => new PrismaUserRepository(prisma),
    inject: [PRISMA],
  },
  { provide: UserValidator, useClass: PrismaUserValidator },
];

@Module({})
export class PrismaModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: PrismaModule,
      providers: [
        { provide: PRISMA, useFactory: PrismaClientFactory },
        { provide: APP_FILTER, useClass: PrismaClientExceptionFilter },
      ],
      exports: [PRISMA],
    };
  }

  static forFeature(): DynamicModule {
    return {
      module: PrismaModule,
      providers,
      exports: providers,
    };
  }
}
