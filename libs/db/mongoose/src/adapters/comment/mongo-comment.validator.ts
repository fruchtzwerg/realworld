import { BypassValidator, type CommentValidator } from '@realworld/core';
import type { Comment } from '@realworld/dto';

export class MongoCommentValidator extends BypassValidator<Comment> implements CommentValidator {}
