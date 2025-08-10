import type { Article, Comment, CreateComment } from '@realworld/dto';
import type { Context } from '../common';
import type { CommentRepository } from './comment.repo';
import type { CommentValidator } from './comment.validator';

export class CommentService {
  constructor(
    private readonly ctx: Context,
    private readonly repository: CommentRepository,
    private readonly validator: CommentValidator
  ) {}

  /** Get all comments of an article */
  async getComments(slug: Article['slug']): Promise<Comment[]> {
    const currentUsername = this.ctx.getUsername();
    const comments = await this.repository.findMany(slug);

    return this.validator.validateMany(comments, currentUsername);
  }

  /** Create a new comment on an article */
  async createComment(slug: Article['slug'], commentDto: CreateComment): Promise<Comment> {
    const currentUsername = this.ctx.getUsername();
    if (!currentUsername) throw new Error('User not authenticated');

    const comment = await this.repository.create(slug, currentUsername, commentDto);

    return this.validator.validate(comment, currentUsername);
  }

  /** Delete a comment from an article */
  async deleteComment(slug: Article['slug'], id: Comment['id']): Promise<Comment> {
    const currentUsername = this.ctx.getUsername();
    if (!currentUsername) throw new Error('User not authenticated');

    const comment = await this.repository.delete(slug, currentUsername, id);

    return this.validator.validate(comment, currentUsername);
  }
}
