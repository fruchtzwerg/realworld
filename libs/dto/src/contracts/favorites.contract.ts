import { initContract } from '@ts-rest/core';

import { ArticleDtoSchema, ArticleParamsSchema } from '../models/article.dto';
import { ErrorSchema } from '../models/error.dto';

const c = initContract();

export const favoritesContract = c.router({
  setFavorite: {
    method: 'POST',
    path: '/articles/:slug/favorite',
    description: 'Add article to favorites',
    pathParams: ArticleParamsSchema,
    body: null,
    responses: {
      200: ArticleDtoSchema,
      401: null,
      422: ErrorSchema,
    },
  },

  deleteFavorite: {
    method: 'DELETE',
    path: '/articles/:slug/favorite',
    pathParams: ArticleParamsSchema,
    body: null,
    responses: {
      200: ArticleDtoSchema,
      401: null,
      422: ErrorSchema,
    },
  },
});
