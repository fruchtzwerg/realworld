import { ArticleRepository } from '@realworld/core';
import {
  Article,
  ArticlesQuery,
  CreateArticleDto,
  FeedQuery,
  UpdateArticleDto,
  User,
} from '@realworld/dto';

import { ExtendedPrismaClient } from '../../factories/prisma.factory';

export class PrismaArticleRepository extends ArticleRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {
    super();
  }

  override count(): Promise<number> {
    return this.prisma.article.count();
  }

  async getFeed(query: FeedQuery, username: User['username']): Promise<unknown[]> {
    return this.prisma.article.findMany({
      where: { author: { followers: { some: { username } } } },
      include: {
        author: { include: { followers: { where: { username } } } },
        favoritedBy: true,
      },
      skip: query.offset,
      take: query.limit,
      orderBy: { updatedAt: 'desc' },
    });
  }

  override findMany(query: ArticlesQuery, username?: User['username']) {
    return this.prisma.article.findMany({
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
  }

  override findUnique(slug: Article['slug'], username?: User['username']) {
    return this.prisma.article.findUnique({
      where: { slug },
      include: {
        author: { include: { followers: { where: { username } } } },
        favoritedBy: true,
      },
    });
  }

  override create(
    articleDto: CreateArticleDto,
    slug: Article['slug'],
    email: User['email'],
    username: User['username']
  ) {
    return this.prisma.article.create({
      data: {
        ...articleDto.article,
        slug,
        author: { connect: { email } },
      },
      include: { author: { include: { followers: { where: { username } } } }, favoritedBy: true },
    });
  }

  override update(slug: Article['slug'], articleDto: UpdateArticleDto, username: User['username']) {
    return this.prisma.article.update({
      where: { slug },
      data: articleDto.article,
      include: {
        author: { include: { followers: { where: { username } } } },
        favoritedBy: true,
      },
    });
  }

  override delete(slug: Article['slug']) {
    return this.prisma.article.delete({ where: { slug } });
  }

  override setFavorite(slug: Article['slug'], username: User['username']) {
    return this.prisma.article.update({
      where: { slug },
      data: { favoritedBy: { connect: { username } } },
      include: {
        author: { include: { followers: { where: { username } } } },
        favoritedBy: true,
      },
    });
  }

  override unsetFavorite(
    slug: Article['slug'],
    username: User['username']
  ): Promise<unknown | null> {
    return this.prisma.article.update({
      where: { slug },
      data: { favoritedBy: { disconnect: { username } } },
      include: {
        author: { include: { followers: { where: { username } } } },
        favoritedBy: true,
      },
    });
  }

  override async getTags() {
    const articles = await this.prisma.article.findMany({ distinct: ['tags'] });
    return articles.flatMap((tag) => tag.tagList);
  }

  override deleteAll() {
    return this.prisma.article.deleteMany();
  }
}
