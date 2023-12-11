import { initContract } from '@ts-rest/core';

import { ArticleParamsSchema } from '../models/article.dto';
import {
  CommentDtoSchema,
  CommentSchema,
  CommentsDtoSchema,
  CreateCommentDtoSchema,
} from '../models/comment.dto';
import { ErrorSchema } from '../models/error.dto';

const c = initContract();

export const commentsContract = c.router({
  getComments: {
    method: 'GET',
    path: '/articles/:slug/comments',
    pathParams: ArticleParamsSchema,
    responses: {
      200: CommentsDtoSchema,
      401: null,
      422: ErrorSchema,
    },
  },

  createComment: {
    method: 'POST',
    path: '/articles/:slug/comments',
    pathParams: ArticleParamsSchema,
    body: CreateCommentDtoSchema,
    responses: {
      200: CommentDtoSchema,
      401: null,
      422: ErrorSchema,
    },
  },

  deleteComment: {
    method: 'DELETE',
    path: '/articles/:slug/comments/:id',
    pathParams: ArticleParamsSchema.merge(CommentSchema.pick({ id: true })),
    body: null,
    responses: {
      200: null,
      401: null,
      422: ErrorSchema,
    },
  },
});
