import type { TagsDto } from '@realworld/dto';

import type { HandlerContext } from '../context';

export const getTags = async (ctx: HandlerContext): Promise<TagsDto> => {
  const tags = await ctx.services.articleService.getTags();
  return { tags };
};
