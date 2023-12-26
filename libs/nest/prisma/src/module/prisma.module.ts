import { DynamicModule, Module, Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ArticleService, CommentService, ProfileService, UserService } from '@realworld/common';

import { PrismaClientExceptionFilter } from '../filters/prisma-client-exception.filter';
import { PRISMA, PrismaClientFactory } from '../providers/prisma.provider';
import { PrismaArticleService } from '../services/prisma-article.service';
import { PrismaCommentService } from '../services/prisma-comment.service';
import { PrismaProfileService } from '../services/prisma-profile.service';
import { PrismaUserService } from '../services/prisma-user.service';

const providers: Provider[] = [
  { provide: ArticleService, useClass: PrismaArticleService },
  { provide: CommentService, useClass: PrismaCommentService },
  { provide: UserService, useClass: PrismaUserService },
  { provide: ProfileService, useClass: PrismaProfileService },
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
