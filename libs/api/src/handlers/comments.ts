import type {
  ArticleParams,
  CommentDto,
  CommentParams,
  CommentsDto,
  CreateCommentDto,
} from '@realworld/dto';

import type { HandlerContext } from '../context';

export const getComments = async (
  ctx: HandlerContext,
  params: ArticleParams
): Promise<CommentsDto> => {
  const comments = await ctx.services.commentService.getComments(params.slug);
  return { comments };
};

export const createComment = async (
  ctx: HandlerContext,
  params: ArticleParams,
  body: CreateCommentDto
): Promise<CommentDto> => {
  const comment = await ctx.services.commentService.createComment(params.slug, body.comment);
  return { comment };
};

export const deleteComment = async (
  ctx: HandlerContext,
  params: ArticleParams & CommentParams
): Promise<void> => {
  await ctx.services.commentService.deleteComment(params.slug, params.id);
};
