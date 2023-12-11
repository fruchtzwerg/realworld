import { Article, Comment, CreateComment } from '@realworld/dto';

export abstract class CommentService {
  /** Get comments for an article. */
  abstract getComments(slug: Article['slug']): Promise<Comment[]>;

  /** Create a comment for an article. */
  abstract createComment(slug: Article['slug'], comment: CreateComment): Promise<Comment>;

  /** Delete a comment. */
  abstract deleteComment(slug: Article['slug'], id: Comment['id']): Promise<Comment>;
}
