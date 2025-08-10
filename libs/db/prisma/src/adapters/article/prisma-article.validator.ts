import { ArticleValidator } from '@realworld/core';
import type { Article } from '@realworld/dto';

import { PrismaArticleSchema } from './prisma-article.model';

export class PrismaArticleValidator extends ArticleValidator {
  override validate(entity: unknown, username?: string): Article {
    return PrismaArticleSchema(username).parse(entity);
  }

  override validateMany(entities: unknown[], username?: string): Article[] {
    return PrismaArticleSchema(username).array().parse(entities);
  }
}
