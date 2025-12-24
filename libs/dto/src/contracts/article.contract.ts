import { oc } from '@orpc/contract';
import z from 'zod';

import {
  ArticleDtoSchema,
  ArticleParamsSchema,
  ArticlesDtoSchema,
  ArticlesQuerySchema,
  CreateArticleDtoSchema,
  FeedQuerySchema,
  UpdateArticleDtoSchema,
} from '../models/article.dto';

export const articleContract = {
  getFeed: oc
    .route({
      method: 'GET',
      path: '/articles/feed',
      tags: ['Articles'],
      inputStructure: 'detailed',
      // query: FeedQuerySchema,
      // responses: {
      //   200: ArticlesDtoSchema,
      //   401: null,
      //   422: ErrorSchema,
      // },
    })
    .input(z.object({ query: FeedQuerySchema }))
    .output(ArticlesDtoSchema)
    .errors({ UNAUTHORIZED: {}, UNPROCESSABLE_CONTENT: {} }),

  getArticles: oc
    .route({
      method: 'GET',
      path: '/articles',
      tags: ['Articles'],
      inputStructure: 'detailed',
      // query: ArticlesQuerySchema,
      // responses: {
      //   200: ArticlesDtoSchema,
      //   422: ErrorSchema,
      // },
    })
    .input(z.object({ query: ArticlesQuerySchema }))
    .output(ArticlesDtoSchema)
    .errors({ UNPROCESSABLE_CONTENT: {} }),

  getArticle: oc
    .route({
      method: 'GET',
      path: '/articles/{slug}',
      tags: ['Articles'],
      inputStructure: 'detailed',
      // pathParams: ArticleParamsSchema,
      // responses: {
      //   200: ArticleDtoSchema,
      //   422: ErrorSchema,
      // },
    })
    .input(z.object({ params: ArticleParamsSchema }))
    .output(ArticleDtoSchema)
    .errors({ UNPROCESSABLE_CONTENT: {} }),

  createArticle: oc
    .route({
      method: 'POST',
      path: '/articles',
      successStatus: 201,
      tags: ['Articles'],
      inputStructure: 'detailed',
      // body: CreateArticleDtoSchema,
      // responses: {
      //   201: ArticleDtoSchema,
      //   401: null,
      //   422: ErrorSchema,
      // },
    })
    .input(z.object({ body: CreateArticleDtoSchema }))
    .output(ArticleDtoSchema)
    .errors({
      UNAUTHORIZED: {},
      UNPROCESSABLE_CONTENT: {},
    }),

  updateArticle: oc
    .route({
      method: 'PUT',
      path: '/articles/{slug}',
      tags: ['Articles'],
      inputStructure: 'detailed',
      // pathParams: ArticleParamsSchema,
      // body: UpdateArticleDtoSchema,
      // responses: {
      //   200: ArticleDtoSchema,
      //   401: null,
      //   422: ErrorSchema,
      // },
    })
    .input(z.object({ params: ArticleParamsSchema, body: UpdateArticleDtoSchema }))
    .output(ArticleDtoSchema)
    .errors({ UNAUTHORIZED: {}, UNPROCESSABLE_CONTENT: {} }),

  deleteArticle: oc
    .route({
      method: 'DELETE',
      path: '/articles/{slug}',
      tags: ['Articles'],
      inputStructure: 'detailed',
      // pathParams: ArticleParamsSchema,
      // body: null,
      // responses: {
      //   200: null,
      //   401: null,
      //   422: ErrorSchema,
      // },
    })
    .input(z.object({ params: ArticleParamsSchema }))
    .errors({ UNAUTHORIZED: {}, UNPROCESSABLE_CONTENT: {} }),
};
