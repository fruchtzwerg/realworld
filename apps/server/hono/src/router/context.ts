import type { Services } from '@realworld/core';
import type { MongoModels } from '@realworld/mongoose';
import type { ExtendedPrismaClient } from '@realworld/prisma';

export interface AuthUser {
  username: string;
  email: string;
}

export interface RouterContext {
  headers: Headers;
  database: ExtendedPrismaClient | MongoModels;
  services: Services;
  user?: AuthUser;
  token?: string;
}
