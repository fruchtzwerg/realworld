import type { Article, User } from '@realworld/dto';

export abstract class ArticleValidator {
  abstract validate(article: unknown, username?: User['username']): Article;
  abstract validateMany(articles: unknown[], username?: User['username']): Article[];
}
