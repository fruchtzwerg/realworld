import { verify } from 'hono/jwt';

import { Context, createServices } from '@realworld/core';

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

const initMongoose = async (ctx: RequestContext, uri: string) => {
  const {
    MongoClientFactory,
    MongoUserRepository,
    MongoProfileRepository,
    MongoArticleRepository,
    MongoCommentRepository,
    MongoUserValidator,
    MongoProfileValidator,
    MongoArticleValidator,
    MongoCommentValidator,
  } = await import('@realworld/mongoose');

  const models = await MongoClientFactory(uri);

  const services = createServices(
    ctx,
    {
      userRepository: new MongoUserRepository(models.userModel, models.articleModel),
      profileRepository: new MongoProfileRepository(models.userModel),
      articleRepository: new MongoArticleRepository(models.articleModel, models.userModel),
      commentRepository: new MongoCommentRepository(
        models.commentModel,
        models.articleModel,
        models.userModel
      ),
    },
    {
      userValidator: new MongoUserValidator(),
      profileValidator: new MongoProfileValidator(),
      articleValidator: new MongoArticleValidator(),
      commentValidator: new MongoCommentValidator(),
    },
    new HonoJwtSigner()
  );

  return { database: models, services };
};

const initPrisma = async (ctx: RequestContext) => {
  const {
    PrismaArticleRepository,
    PrismaArticleValidator,
    PrismaClientFactory,
    PrismaCommentRepository,
    PrismaCommentValidator,
    PrismaProfileRepository,
    PrismaProfileValidator,
    PrismaUserRepository,
    PrismaUserValidator,
  } = await import('@realworld/prisma');

  const prisma = PrismaClientFactory();
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

  return { database: prisma, services };
};

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

  const ctx = new RequestContext(
    () => token,
    () => user?.username
  );

  switch (environment.database.adapter) {
    case 'mongoose': {
      const { database, services } = await initMongoose(ctx, environment.database.uri);
      return { headers, user, token, database, services };
    }

    case 'prisma': {
      const { database, services } = await initPrisma(ctx);
      return { headers, user, token, database, services };
    }
  }
};
