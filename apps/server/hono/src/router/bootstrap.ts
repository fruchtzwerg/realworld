import { verify } from 'hono/jwt';

import {
  ArticleService,
  CommentService,
  Context,
  ProfileService,
  UserService,
} from '@realworld/core';
import {
  PrismaArticleRepository,
  PrismaArticleValidator,
  PrismaClientFactory,
  PrismaCommentRepository,
  PrismaCommentValidator,
  PrismaProfileRepository,
  PrismaProfileValidator,
  PrismaUserRepository,
  PrismaUserValidator,
} from '@realworld/prisma';

import { AuthService } from '../modules/auth/auth.service';
import { environment } from '../environment/environment';
import type { AuthUser, RouterContext, Services } from './context';

class RequestContext extends Context {
  constructor(
    private readonly token: () => string | undefined,
    private readonly username: () => string | undefined
  ) {
    super();
  }

  override getToken(): string | undefined {
    return this.token();
  }

  override getUsername(): string | undefined {
    return this.username();
  }
}

export const createContext = async (headers: Headers): Promise<RouterContext> => {
  const header = headers.get('authorization');
  const match = header?.match(/^Token\s+(.+)$/i);

  let user: AuthUser | undefined;
  let token: string | undefined;

  if (match) {
    token = match[1];
    try {
      const payload = await verify(token, environment.jwt.secret, environment.jwt.alg);
      user = { username: payload.username as string, email: payload.email as string };
    } catch {
      /* leave undefined — treated as unauthenticated */
    }
  }

  const prisma = PrismaClientFactory();
  const ctx = new RequestContext(() => token, () => user?.username);

  const services: Services = {
    userService: new UserService(ctx, new PrismaUserRepository(prisma), new PrismaUserValidator()),
    authService: new AuthService(
      new UserService(ctx, new PrismaUserRepository(prisma), new PrismaUserValidator())
    ),
    profileService: new ProfileService(
      ctx,
      new PrismaProfileRepository(prisma),
      new PrismaProfileValidator()
    ),
    articleService: new ArticleService(
      ctx,
      new PrismaArticleRepository(prisma),
      new PrismaArticleValidator()
    ),
    commentService: new CommentService(
      ctx,
      new PrismaCommentRepository(prisma),
      new PrismaCommentValidator()
    ),
  };

  return { headers, user, token, prisma, services };
};
