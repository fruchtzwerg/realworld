import { PrismaClient } from '@prisma/client';

import { prismaArticle } from '../extensions/article.extension';
import { prismaUser } from '../extensions/user.extension';

export type ExtendedPrismaClient = ReturnType<typeof PrismaClientFactory>;

export const PRISMA = 'Prisma';

export const PrismaClientFactory = () => {
  const prisma = new PrismaClient()
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
