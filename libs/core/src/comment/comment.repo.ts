import type { Article, Comment, CreateComment, User } from '@realworld/dto';

export abstract class CommentRepository {
  /** Get comments for an article, optionally including whether the current user is following the author. */
  abstract findMany(
    slug: Article['slug'],
    username?: Article['author']['username']
  ): Promise<unknown[]>;

  /** Get comments for an article, optionally including whether the current user is following the author. */
  abstract create(
    slug: Article['slug'],
    username: User['username'],
    comment: CreateComment
  ): Promise<unknown>;

  /** Get comments for an article, optionally including whether the current user is following the author. */
  abstract delete(
    slug: Article['slug'],
    username: User['username'],
    id: Comment['id']
  ): Promise<unknown>;
}
