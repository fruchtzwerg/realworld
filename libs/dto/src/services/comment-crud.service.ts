import { Article } from '../models/article.dto';
import { Comment, CreateComment } from '../models/comment.dto';

export interface CommentCrudService {
  /** Get comments for an article. */
  getComments(slug: Article['slug']): Promise<Comment[]>;

  /** Create a comment for an article. */
  createComment(slug: Article['slug'], comment: CreateComment): Promise<Comment>;

  /** Delete a comment. */
  deleteComment(slug: Article['slug'], id: Comment['id']): Promise<Comment>;
}
