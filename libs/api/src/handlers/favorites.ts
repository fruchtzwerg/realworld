import { assertFound } from '@realworld/core';
import type { ArticleDto, ArticleParams } from '@realworld/dto';

import type { HandlerContext } from '../context';

export const setFavorite = async (ctx: HandlerContext, params: ArticleParams): Promise<ArticleDto> => {
  const article = assertFound(
    await ctx.services.articleService.setFavorite(params.slug),
    'article'
  );
  return { article };
};

export const deleteFavorite = async (
  ctx: HandlerContext,
  params: ArticleParams
): Promise<ArticleDto> => {
  const article = assertFound(
    await ctx.services.articleService.unsetFavorite(params.slug),
    'article'
  );
  return { article };
};
