import { User } from '@prisma/client';

import { CommentRepository } from '@realworld/core';
import { Article, Comment, CreateComment } from '@realworld/dto';

import { ExtendedPrismaClient } from '../../factories/prisma.factory';

export class PrismaCommentRepository extends CommentRepository {
  constructor(private readonly prisma: ExtendedPrismaClient) {
    super();
  }

  override findMany(slug: Article['slug']): Promise<unknown[]> {
    return this.prisma.comment.findMany({
      where: { article: { slug } },
      include: { author: { include: { followers: true } } },
      orderBy: { updatedAt: 'desc' },
    });
  }

  override create(
    slug: Article['slug'],
    username: User['username'],
    comment: CreateComment
  ): Promise<unknown> {
    return this.prisma.comment.create({
      data: {
        body: comment.body,
        author: { connect: { username } },
        article: { connect: { slug } },
      },
      include: { author: { include: { followers: true } } },
    });
  }

  override delete(
    slug: Article['slug'],
    username: User['username'],
    id: Comment['id']
  ): Promise<unknown> {
    return this.prisma.comment.delete({
      where: { id, article: { slug }, author: { username } },
      include: { author: { include: { followers: true } } },
    });
  }
}
