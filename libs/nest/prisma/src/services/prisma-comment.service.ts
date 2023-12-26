import { Inject, Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { CommentService } from '@realworld/common';
import { Article, Comment, CreateComment, ResolvedPayloadDto } from '@realworld/dto';

import { PrismaCommentSchema } from '../models/comment.model';
import { ExtendedPrismaClient, PRISMA } from '../providers/prisma.provider';

@Injectable()
export class PrismaCommentService extends CommentService {
  constructor(
    @Inject(PRISMA) private readonly prisma: ExtendedPrismaClient,
    private readonly store: ClsService<ResolvedPayloadDto>
  ) {
    super();
  }

  async getComments(slug: Article['slug']): Promise<Comment[]> {
    const username = this.store.get('user.username');
    const comments = await this.prisma.comment.findMany({
      where: { article: { slug } },
      include: { author: { include: { followers: true } } },
      orderBy: { updatedAt: 'desc' },
    });

    return PrismaCommentSchema(username).array().parse(comments);
  }

  async createComment(slug: Article['slug'], comment: CreateComment): Promise<Comment> {
    const username = this.store.get('user.username');
    const createdComment = await this.prisma.comment.create({
      data: {
        body: comment.body,
        author: { connect: { username } },
        article: { connect: { slug } },
      },
      include: { author: { include: { followers: true } } },
    });

    return PrismaCommentSchema(username).parse(createdComment);
  }

  async deleteComment(slug: Article['slug'], id: Comment['id']): Promise<Comment> {
    const username = this.store.get('user.username');
    const deletedComment = await this.prisma.comment.delete({
      where: { id, article: { slug }, author: { username } },
      include: { author: { include: { followers: true } } },
    });

    return PrismaCommentSchema(username).parse(deletedComment);
  }
}
