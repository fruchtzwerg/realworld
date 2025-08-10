import { initContract } from '@ts-rest/core';

import {
  ArticleDtoSchema,
  ArticleParamsSchema,
  ArticlesDtoSchema,
  ArticlesQuerySchema,
  CreateArticleDtoSchema,
  FeedQuerySchema,
  UpdateArticleDtoSchema,
} from '../models/article.dto';
import { ErrorSchema } from '../models/error.dto';

const c = initContract();

export const articleContract = c.router({
  getFeed: {
    method: 'GET',
    path: '/articles/feed',
    query: FeedQuerySchema,
    responses: {
      200: ArticlesDtoSchema,
      401: null,
      422: ErrorSchema,
    },
  },

  getArticles: {
    method: 'GET',
    path: '/articles',
    query: ArticlesQuerySchema,
    responses: {
      200: ArticlesDtoSchema,
      422: ErrorSchema,
    },
  },

  getArticle: {
    method: 'GET',
    path: '/articles/:slug',
    pathParams: ArticleParamsSchema,
    responses: {
      200: ArticleDtoSchema,
      422: ErrorSchema,
    },
  },

  createArticle: {
    method: 'POST',
    path: '/articles',
    body: CreateArticleDtoSchema,
    responses: {
      201: ArticleDtoSchema,
      401: null,
      422: ErrorSchema,
    },
  },

  updateArticle: {
    method: 'PUT',
    path: '/articles/:slug',
    pathParams: ArticleParamsSchema,
    body: UpdateArticleDtoSchema,
    responses: {
      200: ArticleDtoSchema,
      401: null,
      422: ErrorSchema,
    },
  },

  deleteArticle: {
    method: 'DELETE',
    path: '/articles/:slug',
    pathParams: ArticleParamsSchema,
    body: null,
    responses: {
      200: null,
      401: null,
      422: ErrorSchema,
    },
  },
});
