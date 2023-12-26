import { CommentSchema, User } from '@realworld/dto';

import { PrismaProfileSchema } from './profile.model';

export const PrismaCommentSchema = (username?: User['username']) =>
  CommentSchema.extend({
    author: PrismaProfileSchema(username),
  });
