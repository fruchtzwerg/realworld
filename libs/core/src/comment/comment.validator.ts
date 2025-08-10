import type { Comment } from '@realworld/dto';

export abstract class CommentValidator {
  // Define validation contracts for the domain
  abstract validate(entity: unknown, username?: string): Comment;
  abstract validateMany(entities: unknown[], username?: string): Comment[];
}
