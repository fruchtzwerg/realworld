import type { CreateUser } from '@realworld/dto';

import { PrismaClientFactory } from '../src/providers/prisma.provider';
import { PrismaArticleService } from '../src/services/prisma-article.service';
import { PrismaUserService } from '../src/services/prisma-user.service';

const prisma = PrismaClientFactory();
const userService = new PrismaUserService(prisma, { get: () => 'token' } as any);
const articleService = new PrismaArticleService(prisma, { get: () => 'luke' } as any);

const users: CreateUser[] = [
  {
    username: 'luke',
    email: 'luke.skywalker@jedi.tat',
    password: '12345678',
  },
  {
    username: 'leia',
    email: 'laia.organa@senate.ald',
    password: '12345678',
  },
  {
    username: 'han',
    email: 'han.solo@millennium-falcon.space',
    password: '12345678',
  },
];

const articles = [
  {
    title: 'How to train your dragon',
    description: 'Ever wonder how?',
    body: 'You have to believe',
    tagList: ['reactjs', 'angular', 'dragons'],
  },
  {
    title: 'How to train your dragon 2',
    description: 'So toothless',
    body: 'It a dragon',
    tagList: ['angular', 'dragons'],
  },
];

const main = async () => {
  await prisma.$connect();

  await Promise.all(users.map((user) => userService.createUser({ user })));
  await articles.reduce(async (acc: Promise<unknown>, article, i) => {
    await acc;
    return articleService.createArticle({ article }, users[i].email);
  }, Promise.resolve());
};

main();
