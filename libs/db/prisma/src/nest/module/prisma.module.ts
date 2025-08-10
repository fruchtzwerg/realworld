import { DynamicModule, Module, Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import {
  ArticleRepository,
  ArticleValidator,
  CommentRepository,
  CommentValidator,
  ProfileRepository,
  ProfileValidator,
  UserRepository,
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
import { PrismaClientExceptionFilter } from '../filters/prisma-client-exception.filter';
import {
  PRISMA,
  PrismaClientFactory,
  type ExtendedPrismaClient,
} from '../providers/prisma.provider';

const providers: Provider[] = [
  {
    provide: ArticleRepository,
    useFactory: (prisma: ExtendedPrismaClient) => new PrismaArticleRepository(prisma),
    inject: [PRISMA],
  },
  { provide: ArticleValidator, useClass: PrismaArticleValidator },
  { provide: CommentRepository, useClass: PrismaCommentRepository },
  { provide: CommentValidator, useClass: PrismaCommentValidator },
  { provide: ProfileRepository, useClass: PrismaProfileRepository },
  { provide: ProfileValidator, useClass: PrismaProfileValidator },
  { provide: UserRepository, useClass: PrismaUserRepository },
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
