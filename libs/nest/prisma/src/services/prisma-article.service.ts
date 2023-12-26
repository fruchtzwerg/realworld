import { Inject, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { ArticleService } from '@realworld/common';
import {
  Article,
  ArticlesQuery,
  CreateArticleDto,
  FeedQuery,
  ResolvedPayloadDto,
  UpdateArticleDto,
  User,
} from '@realworld/dto';
import { slugify } from '@realworld/utils';

import { PrismaArticleSchema } from '../models/article.model';
import { ExtendedPrismaClient, PRISMA } from '../providers/prisma.provider';

@Injectable()
export class PrismaArticleService extends ArticleService {
  constructor(
    @Inject(PRISMA) private readonly prisma: ExtendedPrismaClient,
    private readonly store: ClsService<ResolvedPayloadDto>
  ) {
    super();
  }

  async getArticlesCount(): Promise<number> {
    return this.prisma.article.count();
  }

  async getFeed(query: FeedQuery): Promise<Article[]> {
    const username = this.store.get('user.username');
    const articles = await this.prisma.article.findMany({
      where: { author: { followers: { some: { username } } } },
      include: {
        author: { include: { followers: { where: { username } } } },
        favoritedBy: true,
      },
      skip: query.offset,
      take: query.limit,
      orderBy: { updatedAt: 'desc' },
    });

    return PrismaArticleSchema(username).array().parse(articles);
  }

  async getArticles(query: ArticlesQuery): Promise<Article[]> {
    const username = this.store.get('user.username');
    const articles = await this.prisma.article.findMany({
      where: {
        author: query.author ? { username: query.author } : undefined,
        favoritedBy: query.favorited ? { some: { username: query.favorited } } : undefined,
        tags: query.tag ? { contains: query.tag } : undefined,
      },
      include: {
        author: { include: { followers: { where: { username } } } },
        favoritedBy: true,
      },
      skip: query.offset,
      take: query.limit,
      orderBy: { updatedAt: 'desc' },
    });

    return PrismaArticleSchema(username).array().parse(articles);
  }

  async getArticle(slug: Article['slug']): Promise<Article | null> {
    const username = this.store.get('user.username');
    const article = await this.prisma.article.findUnique({
      where: { slug },
      include: {
        author: { include: { followers: { where: { username } } } },
        favoritedBy: true,
      },
    });
    if (!article) return null;

    return PrismaArticleSchema(username).parse(article);
  }

  async createArticle(articleDto: CreateArticleDto, email: User['email']): Promise<Article> {
    const username = this.store.get('user.username');
    const article = await this.prisma.article.create({
      data: {
        ...articleDto.article,
        slug: slugify(articleDto.article.title),
        author: { connect: { email } },
      },
      include: { author: { include: { followers: { where: { username } } } }, favoritedBy: true },
    });

    return PrismaArticleSchema(username).parse(article);
  }

  async updateArticle(
    slug: Article['slug'],
    articleDto: UpdateArticleDto
  ): Promise<Article | null> {
    const username = this.store.get('user.username');
    const article = await this.prisma.article.update({
      where: { slug },
      data: articleDto.article,
      include: {
        author: { include: { followers: { where: { username } } } },
        favoritedBy: true,
      },
    });

    return PrismaArticleSchema(username).parse(article);
  }

  async deleteArticle(slug: Article['slug']): Promise<void> {
    await this.prisma.article.delete({ where: { slug } });
  }

  async setFavorite(slug: Article['slug']): Promise<Article | null> {
    const username = this.store.get('user.username');
    const article = await this.prisma.article.update({
      where: { slug },
      data: { favoritedBy: { connect: { username } } },
      include: {
        author: { include: { followers: { where: { username } } } },
        favoritedBy: true,
      },
    });

    return PrismaArticleSchema(username).parse(article);
  }

  async unsetFavorite(slug: Article['slug']): Promise<Article | null> {
    const username = this.store.get('user.username');
    const article = await this.prisma.article.update({
      where: { slug },
      data: { favoritedBy: { disconnect: { username } } },
      include: {
        author: { include: { followers: { where: { username } } } },
        favoritedBy: true,
      },
    });

    return PrismaArticleSchema(username).parse(article);
  }

  async getTags(): Promise<string[]> {
    const articles = await this.prisma.article.findMany({ distinct: ['tags'] });
    const tags = articles.flatMap((tag) => tag.tagList);

    return [...new Set(tags)];
  }

  async deleteAll(): Promise<void> {
    await this.prisma.article.deleteMany();
  }
}
