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
  PrismaArticleValidator,
  PrismaCommentValidator,
  PrismaProfileValidator,
  PrismaUserValidator,
} from '../../adapters';
import { PrismaClientExceptionFilter } from '../filters/prisma-client-exception.filter';
import { PRISMA, PrismaClientFactory } from '../providers/prisma.provider';
import {
  NestPrismaArticleRepository,
  NestPrismaCommentRepository,
  NestPrismaProfileRepository,
  NestPrismaUserRepository,
} from '../repositories';

const providers: Provider[] = [
  { provide: ArticleRepository, useClass: NestPrismaArticleRepository },
  { provide: ArticleValidator, useClass: PrismaArticleValidator },
  { provide: CommentRepository, useClass: NestPrismaCommentRepository },
  { provide: CommentValidator, useClass: PrismaCommentValidator },
  { provide: ProfileRepository, useClass: NestPrismaProfileRepository },
  { provide: ProfileValidator, useClass: PrismaProfileValidator },
  { provide: UserRepository, useClass: NestPrismaUserRepository },
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
