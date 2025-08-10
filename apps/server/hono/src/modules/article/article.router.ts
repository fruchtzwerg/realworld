import { zValidator } from '@hono/zod-validator';

import {
  ArticleParamsSchema,
  ArticlesQuerySchema,
  contract,
  CreateArticleDtoSchema,
  FeedQuerySchema,
  UpdateArticleDtoSchema,
} from '@realworld/dto';

import { errorDto } from '../../dto/error.dto';
import { factory } from '../../factory/app.factory';
import { openapi } from '../../utils/openapi.utils';

export const createArticleRouter = () => {
  const router = factory.createApp();

  /** Get current user's feed */
  router.get(
    '/feed',
    openapi(contract.article.getFeed),
    zValidator('query', FeedQuerySchema),
    async (c) => {
      const query = c.req.queries();
      const { articleService } = c.get('services');

      try {
        const feed = await articleService.getFeed(query);
        return c.json(feed, 200);
      } catch (err) {
        console.error(err);
        return c.json(errorDto(['Could not get feed.']), 422);
      }
    }
  );

  /** Get articles */
  router.get(
    '/',
    openapi(contract.article.getArticles),
    zValidator('query', ArticlesQuerySchema),
    async (c) => {
      const query = c.req.valid('query');
      const { articleService } = c.get('services');

      try {
        const articles = await articleService.getArticles(query);
        return c.json(articles);
      } catch (err) {
        console.error(err);
        return c.json(errorDto(['Could not get articles']), 422);
      }
    }
  );

  /** Get a single article */
  router.get(
    '/:slug',
    openapi(contract.article.getArticle),
    zValidator('param', ArticleParamsSchema),
    async (c) => {
      const { slug } = c.req.valid('param');
      const { articleService } = c.get('services');

      try {
        const article = await articleService.getArticle(slug);
        return c.json(article);
      } catch (err) {
        console.error(err);
        return c.json(errorDto([`Could not get article ${slug}`]), 422);
      }
    }
  );

  /** Create an article */
  router.post(
    '/',
    openapi(contract.article.createArticle),
    zValidator('json', CreateArticleDtoSchema),
    async (c) => {
      const body = c.req.valid('json');
      const { articleService } = c.get('services');

      try {
        const article = await articleService.createArticle(body, 'mail@test.de');
        return c.json(article, 200);
      } catch (err) {
        console.error(err);
        return c.json(errorDto(['Could not create article.']), 422);
      }
    }
  );

  /** Update an article */
  router.put(
    '/:slug',
    openapi(contract.article.updateArticle),
    zValidator('param', ArticleParamsSchema),
    zValidator('json', UpdateArticleDtoSchema),
    async (c) => {
      const { slug } = c.req.valid('param');
      const body = c.req.valid('json');
      const { articleService } = c.get('services');

      try {
        const article = await articleService.updateArticle(slug, body);
        return c.json(article, 200);
      } catch (err) {
        console.error(err);
        return c.json(errorDto(['Could not article.']), 422);
      }
    }
  );

  /** Delete an article */
  router.delete(
    '/:slug',
    openapi(contract.article.deleteArticle),
    zValidator('param', ArticleParamsSchema),
    async (c) => {
      const { slug } = c.req.valid('param');
      const { articleService } = c.get('services');

      try {
        await articleService.deleteArticle(slug);
        return c.body(null, 204);
      } catch (err) {
        console.error(err);
        return c.json(errorDto(['Could not delete article.']), 422);
      }
    }
  );

  return router;
};
