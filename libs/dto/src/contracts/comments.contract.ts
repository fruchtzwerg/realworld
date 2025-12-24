import { oc } from '@orpc/contract';
import z from 'zod';

import { ArticleParamsSchema } from '../models/article.dto';
import {
  CommentDtoSchema,
  CommentParamsSchema,
  CommentsDtoSchema,
  CreateCommentDtoSchema,
} from '../models/comment.dto';

export const commentsContract = {
  getComments: oc
    .route({
      method: 'GET',
      path: '/articles/{slug}/comments',
      tags: ['Comments'],
      inputStructure: 'detailed',
      // pathParams: ArticleParamsSchema,
      // responses: {
      //   200: CommentsDtoSchema,
      //   401: null,
      //   422: ErrorSchema,
      // },
    })
    .input(z.object({ params: ArticleParamsSchema }))
    .output(CommentsDtoSchema)
    .errors({ UNAUTHORIZED: {}, UNPROCESSABLE_CONTENT: {} }),

  createComment: oc
    .route({
      method: 'POST',
      path: '/articles/{slug}/comments',
      tags: ['Comments'],
      inputStructure: 'detailed',
      // pathParams: ArticleParamsSchema,
      // body: CreateCommentDtoSchema,
      // responses: {
      //   200: CommentDtoSchema,
      //   401: null,
      //   422: ErrorSchema,
      // },
    })
    .input(z.object({ params: ArticleParamsSchema, body: CreateCommentDtoSchema }))
    .output(CommentDtoSchema)
    .errors({ UNAUTHORIZED: {}, UNPROCESSABLE_CONTENT: {} }),

  deleteComment: oc
    .route({
      method: 'DELETE',
      path: '/articles/{slug}/comments/{id}',
      tags: ['Comments'],
      inputStructure: 'detailed',
      // pathParams: ArticleParamsSchema.merge(CommentParamsSchema),
      // body: null,
      // responses: {
      //   200: null,
      //   401: null,
      //   422: ErrorSchema,
      // },
    })
    .input(
      z.object({ params: z.object({ ...ArticleParamsSchema.shape, ...CommentParamsSchema.shape }) })
    )
    .errors({ UNAUTHORIZED: {}, UNPROCESSABLE_CONTENT: {} }),
};
