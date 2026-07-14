import { verify } from 'hono/jwt';

import { Context, createServices } from '@realworld/core';
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

import { environment } from '../environment/environment';
import { HonoJwtSigner } from '../modules/auth/jwt-signer';

import type { AuthUser, RouterContext } from './context';

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
  const ctx = new RequestContext(
    () => token,
    () => user?.username
  );

  const services = createServices(
    ctx,
    {
      userRepository: new PrismaUserRepository(prisma),
      profileRepository: new PrismaProfileRepository(prisma),
      articleRepository: new PrismaArticleRepository(prisma),
      commentRepository: new PrismaCommentRepository(prisma),
    },
    {
      userValidator: new PrismaUserValidator(),
      profileValidator: new PrismaProfileValidator(),
      articleValidator: new PrismaArticleValidator(),
      commentValidator: new PrismaCommentValidator(),
    },
    new HonoJwtSigner()
  );

  return { headers, user, token, prisma, services };
};
