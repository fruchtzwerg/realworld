import { contract } from '@realworld/dto';

import { factory } from '../../factory/app.factory';
import { openapi } from '../../utils/openapi.utils';

export const useTagRouter = () => {
  const router = factory.createApp();

  router.get('/', openapi(contract.tags.getTags), async (c) => {
    const { articleService } = c.get('services');
    const tags = await articleService.getTags();

    return c.json({ tags }, 200);
  });

  return router;
};
