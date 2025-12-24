import type { CreateArticle, CreateComment, CreateUser } from '@realworld/dto';
import { slugify } from '@realworld/utils';

import { PrismaArticleRepository } from '../src/adapters/article/prisma-article.repo';
import { PrismaCommentRepository } from '../src/adapters/comment/prisma-comment.repo';
import { PrismaUserRepository } from '../src/adapters/user/prisma-user.repo';
import { PrismaClientFactory } from '../src/factories/prisma.factory';

const prisma = PrismaClientFactory();
const userService = new PrismaUserRepository(prisma);
const articleService = new PrismaArticleRepository(prisma);
const commentService = new PrismaCommentRepository(prisma);

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

const articles: CreateArticle[] = [
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

const comments: CreateComment[] = [
  { body: 'Great article!' },
  { body: 'Very helpful, thanks!' },
  { body: 'I learned a lot!' },
];

const main = async () => {
  await prisma.$connect();

  await Promise.all(users.map((user) => userService.create({ user })));
  await articles.reduce(async (acc: Promise<unknown>, article, i) => {
    await acc;

    const slug = slugify(article.title);

    const createdArticle = await articleService.create(
      { article },
      slug,
      users[i].email,
      users[i].username
    );

    if (i === 0) {
      return comments.reduce(async (acc2: Promise<unknown>, comment) => {
        await acc2;

        return commentService.create(
          createdArticle.slug,
          users[(i + 1) % users.length].username,
          comment
        );
      }, Promise.resolve());
    }

    return acc;
  }, Promise.resolve());
};

main();
