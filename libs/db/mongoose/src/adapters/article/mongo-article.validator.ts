import { ArticleValidator, BypassValidator } from '@realworld/core';
import type { Article } from '@realworld/dto';

export class MongoArticleValidator extends BypassValidator<Article> implements ArticleValidator {}
