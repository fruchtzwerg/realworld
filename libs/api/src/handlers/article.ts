import { assertFound } from '@realworld/core';
import type {
  ArticleDto,
  ArticleParams,
  ArticlesDto,
  ArticlesQuery,
  CreateArticleDto,
  FeedQuery,
  UpdateArticleDto,
} from '@realworld/dto';

import type { HandlerContext } from '../context';

export const getFeed = async (ctx: HandlerContext, query: FeedQuery): Promise<ArticlesDto> => {
  const articles = await ctx.services.articleService.getFeed(query);
  const articlesCount = await ctx.services.articleService.getArticlesCount();
  return { articles, articlesCount };
};

export const getArticles = async (
  ctx: HandlerContext,
  query: ArticlesQuery
): Promise<ArticlesDto> => {
  const articles = await ctx.services.articleService.getArticles(query);
  const articlesCount = await ctx.services.articleService.getArticlesCount();

  return { articles, articlesCount };
};

export const getArticle = async (
  ctx: HandlerContext,
  params: ArticleParams
): Promise<ArticleDto> => {
  const article = assertFound(await ctx.services.articleService.getArticle(params.slug), 'article');
  return { article };
};

export const createArticle = async (
  ctx: HandlerContext,
  body: CreateArticleDto
): Promise<ArticleDto> => {
  const email = ctx.user?.email;
  if (!email) throw new Error('Not authenticated');

  const article = assertFound(await ctx.services.articleService.createArticle(body, email), 'user');

  return { article };
};

export const updateArticle = async (
  ctx: HandlerContext,
  params: ArticleParams,
  body: UpdateArticleDto
): Promise<ArticleDto> => {
  const article = assertFound(
    await ctx.services.articleService.updateArticle(params.slug, body),
    'article'
  );

  return { article };
};

export const deleteArticle = async (ctx: HandlerContext, params: ArticleParams): Promise<void> => {
  await ctx.services.articleService.deleteArticle(params.slug);
};
