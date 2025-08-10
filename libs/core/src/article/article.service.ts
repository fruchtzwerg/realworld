import {
  Article,
  ArticlesQuery,
  CreateArticleDto,
  FeedQuery,
  UpdateArticleDto,
  User,
} from '@realworld/dto';
import { slugify } from '@realworld/utils';

import type { Context } from '../common';

import type { ArticleRepository } from './article.repo';
import type { ArticleValidator } from './article.validator';

export class ArticleService {
  constructor(
    private readonly ctx: Context,
    private readonly repository: ArticleRepository,
    private readonly validator: ArticleValidator
  ) {}

  /** Get the total number of articles */
  async getArticlesCount(): Promise<number> {
    return this.repository.count();
  }

  /** Get the articles feed for user */
  async getFeed(query: FeedQuery): Promise<Article[]> {
    const username = this.ctx.getUsername();
    if (!username) throw new Error('Not authenticated');

    const articles = await this.repository.getFeed(query, username);

    return this.validator.validateMany(articles, username);
  }

  /** Get all articles */
  async getArticles(query: ArticlesQuery): Promise<Article[]> {
    const username = this.ctx.getUsername();
    const articles = await this.repository.findMany(query, username);

    return this.validator.validateMany(articles, username);
  }

  /** Get article by slug */
  async getArticle(slug: Article['slug']): Promise<Article | null> {
    const username = this.ctx.getUsername();
    const article = await this.repository.findUnique(slug, username);
    if (!article) return null;

    return this.validator.validate(article, username);
  }

  /** Create a new article */
  async createArticle(articleDto: CreateArticleDto, email: User['email']): Promise<Article> {
    const username = this.ctx.getUsername();
    if (!username) throw new Error('Not authenticated');

    const slug = slugify(articleDto.article.title);
    const article = await this.repository.create(articleDto, slug, email, username);

    return this.validator.validate(article, username);
  }

  /** Update an existing article */
  async updateArticle(
    slug: Article['slug'],
    articleDto: UpdateArticleDto
  ): Promise<Article | null> {
    const username = this.ctx.getUsername();
    if (!username) throw new Error('Not authenticated');

    const article = await this.repository.update(slug, articleDto, username);

    return this.validator.validate(article, username);
  }

  /** Delete an article */
  async deleteArticle(slug: Article['slug']): Promise<void> {
    await this.repository.delete(slug);
  }

  /** Set article as favorite */
  async setFavorite(slug: Article['slug']): Promise<Article | null> {
    const username = this.ctx.getUsername();
    if (!username) throw new Error('Not authenticated');

    const article = await this.repository.setFavorite(slug, username);

    return this.validator.validate(article, username);
  }

  /** Unset article as favorite */
  async unsetFavorite(slug: Article['slug']): Promise<Article | null> {
    const username = this.ctx.getUsername();
    if (!username) throw new Error('Not authenticated');

    const article = await this.repository.unsetFavorite(slug, username);

    return this.validator.validate(article, username);
  }

  /** Get all tags */
  async getTags(): Promise<string[]> {
    const tags = await this.repository.getTags();
    return [...new Set(tags)];
  }

  /** Delete all articles */
  async deleteAll(): Promise<void> {
    await this.repository.deleteAll();
  }
}
