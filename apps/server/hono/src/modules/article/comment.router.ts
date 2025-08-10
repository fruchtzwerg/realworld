import { zValidator } from '@hono/zod-validator';

import {
  ArticleParamsSchema,
  CommentParamsSchema,
  contract,
  CreateCommentDtoSchema,
} from '@realworld/dto';

import { factory } from '../../factory/app.factory';
import { openapi } from '../../utils/openapi.utils';

export const useCommentRouter = () => {
  const router = factory.createApp();

  router.get(
    '/',
    openapi(contract.comments.getComments),
    zValidator('param', ArticleParamsSchema),
    async (c) => {
      const { slug } = c.req.valid('param');
      const { commentService } = c.get('services');

      const comments = await commentService.getComments(slug);

      return c.json({ comments }, 200);
    }
  );

  router.post(
    '/',
    openapi(contract.comments.createComment),
    zValidator('param', ArticleParamsSchema),
    zValidator('json', CreateCommentDtoSchema),
    async (c) => {
      const { slug } = c.req.valid('param');
      const body = c.req.valid('json');
      const { commentService } = c.get('services');

      const comment = await commentService.createComment(slug, body.comment);

      return c.json({ comment }, 200);
    }
  );

  router.delete(
    '/:id',
    openapi(contract.comments.deleteComment),
    zValidator('param', ArticleParamsSchema.merge(CommentParamsSchema)),
    async (c) => {
      const { id, slug } = c.req.valid('param');
      const { commentService } = c.get('services');

      await commentService.deleteComment(slug, id);

      return c.body(null, 200);
    }
  );

  return router;
};
