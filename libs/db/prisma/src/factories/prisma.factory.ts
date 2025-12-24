import { PrismaClient } from '@prisma/client';

import { prismaArticle } from '../adapters/article/article.extension';
import { prismaUser } from '../adapters/user/user.extension';

export type ExtendedPrismaClient = ReturnType<typeof PrismaClientFactory>;

export const PrismaClientFactory = () => {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    errorFormat: 'pretty',
  })
    .$extends(prismaArticle())
    .$extends(prismaUser())
    .$extends({
      model: {
        user: {
          findUniqueRaw: (email: string) =>
            prisma.user.findUnique({
              where: { email },
              select: { password: true, username: true, email: true, bio: true, image: true },
            }),
        },
      },
    });

  return prisma;
};
