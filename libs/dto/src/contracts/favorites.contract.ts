import { oc } from '@orpc/contract';
import z from 'zod';

import { ArticleDtoSchema, ArticleParamsSchema } from '../models/article.dto';

export const favoritesContract = {
  setFavorite: oc
    .route({
      method: 'POST',
      path: '/articles/{slug}/favorite',
      description: 'Add article to favorites',
      tags: ['Articles'],
      inputStructure: 'detailed',
      // pathParams: ArticleParamsSchema,
      // body: null,
      // responses: {
      //   200: ArticleDtoSchema,
      //   401: null,
      //   422: ErrorSchema,
      // },
    })
    .input(z.object({ params: ArticleParamsSchema }))
    .output(ArticleDtoSchema)
    .errors({ UNAUTHORIZED: {}, UNPROCESSABLE_CONTENT: {} }),

  deleteFavorite: oc
    .route({
      method: 'DELETE',
      path: '/articles/{slug}/favorite',
      tags: ['Articles'],
      inputStructure: 'detailed',
      // pathParams: ArticleParamsSchema,
      // body: null,
      // responses: {
      //   200: ArticleDtoSchema,
      //   401: null,
      //   422: ErrorSchema,
      // },
    })
    .input(z.object({ params: ArticleParamsSchema }))
    .output(ArticleDtoSchema)
    .errors({ UNAUTHORIZED: {}, UNPROCESSABLE_CONTENT: {} }),
};
