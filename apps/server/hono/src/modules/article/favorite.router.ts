import { zValidator } from '@hono/zod-validator';

import { ArticleParamsSchema } from '@realworld/dto';
import { contract } from '@realworld/dto';

import { errorDto } from '../../dto/error.dto';
import { factory } from '../../factory/app.factory';
import { openapi } from '../../utils/openapi.utils';

export const createFavoriteRouter = () => {
  const favorites = factory.createApp();

  /** Add an article to favorites */
  favorites.post(
    '/',
    openapi(contract.favorites.setFavorite),
    zValidator('param', ArticleParamsSchema),
    async (c) => {
      const { slug } = c.req.valid('param');
      const { articleService } = c.get('services');

      try {
        const article = await articleService.setFavorite(slug);
        return c.json(article, 200);
      } catch (err) {
        console.error(err);
        return c.json(errorDto(['Could not add article to favorites.']), 422);
      }
    }
  );

  /** Remove an article form favorites */
  favorites.delete(
    '/',
    openapi(contract.favorites.deleteFavorite),
    zValidator('param', ArticleParamsSchema),
    async (c) => {
      const { slug } = c.req.valid('param');
      const { articleService } = c.get('services');

      try {
        const article = await articleService.unsetFavorite(slug);
        return c.json(article, 200);
      } catch (err) {
        console.error(err);
        return c.json(errorDto(['Could not article.']), 422);
      }
    }
  );

  return favorites;
};
