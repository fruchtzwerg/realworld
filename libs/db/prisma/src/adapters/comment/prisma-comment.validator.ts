import { CommentValidator } from '@realworld/core';
import type { Comment } from '@realworld/dto';

import { PrismaCommentSchema } from './prisma-comment.model';

export class PrismaCommentValidator extends CommentValidator {
  override validate(entity: unknown, username?: string): Comment {
    return PrismaCommentSchema(username).parse(entity);
  }

  override validateMany(entities: unknown[], username?: string): Comment[] {
    return PrismaCommentSchema(username).array().parse(entities);
  }
}
