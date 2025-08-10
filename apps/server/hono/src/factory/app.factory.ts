import { createFactory } from 'hono/factory';

import {
  AuthService,
  ArticleService,
  CommentService,
  ProfileService,
  UserService,
} from '@realworld/core';
import {
  ExtendedPrismaClient,
  PrismaArticleService,
  PrismaClientFactory,
  PrismaCommentService,
  PrismaProfileService,
  PrismaUserService,
} from '@realworld/prisma';

import { JwtVariables } from '../modules/auth';
import { AuthService as HonoAuthService } from '../modules/auth/auth.service';

interface Env {
  Variables: JwtVariables & {
    prisma: ExtendedPrismaClient;
    services: {
      userService: UserService;
      authService: AuthService;
      profileService: ProfileService;
      articleService: ArticleService;
      commentService: CommentService;
    };
  };
}

export const factory = createFactory<Env>({
  initApp: (app) => {
    app.use(async (c, next) => {
      const prisma = PrismaClientFactory();
      c.set('prisma', prisma);

      const userService = new PrismaUserService(prisma, () => 'token');
      const authService = new HonoAuthService(userService);
      const profileService = new PrismaProfileService(prisma, () => 'test123');
      const articleService = new PrismaArticleService(prisma, () => 'test123');
      const commentService = new PrismaCommentService(prisma, () => 'test123');

      c.set('services', {
        userService,
        authService,
        profileService,
        articleService,
        commentService,
      });

      await next();
    });
  },
});
