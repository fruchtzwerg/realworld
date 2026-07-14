import type { Services } from '@realworld/core';
import type { ExtendedPrismaClient } from '@realworld/prisma';

export interface AuthUser {
  username: string;
  email: string;
}

export interface RouterContext {
  headers: Headers;
  prisma: ExtendedPrismaClient;
  services: Services;
  user?: AuthUser;
  token?: string;
}
