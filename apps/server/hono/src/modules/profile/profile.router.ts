import { zValidator } from '@hono/zod-validator';

import { contract, ProfileParamsSchema } from '@realworld/dto';

import { UnprocessableEntityError } from '../../errors/unprocessable-entity.error';
import { factory } from '../../factory/app.factory';
import { openapi } from '../../utils/openapi.utils';
import { jwt } from '../auth';

export const useProfileRouter = () => {
  const router = factory.createApp();

  /** Get profile of user */
  router.get(
    '/:username',
    openapi(contract.profile.getProfile),
    zValidator('param', ProfileParamsSchema),
    async (c) => {
      const { username } = c.req.valid('param');
      const { profileService } = c.get('services');

      const profile = await profileService.getProfile(username);
      if (!profile) throw new UnprocessableEntityError('username is invalid');

      return c.json({ profile }, 200);
    }
  );

  /** Follow user with username */
  router.post(
    '/:username/follow',
    openapi(contract.profile.followUser),
    jwt(),
    zValidator('param', ProfileParamsSchema),
    async (c) => {
      const { username } = c.req.valid('param');
      const { profileService } = c.get('services');

      const profile = await profileService.followUser(username);
      if (!profile) throw new UnprocessableEntityError('username is invalid');

      return c.json({ profile }, 200);
    }
  );

  /** Unfollow user with username */
  router.delete(
    '/:username/follow',
    openapi(contract.profile.unfollowUser),
    jwt(),
    zValidator('param', ProfileParamsSchema),
    async (c) => {
      const { username } = c.req.valid('param');
      const { profileService } = c.get('services');

      const profile = await profileService.unfollowUser(username);
      if (!profile) throw new UnprocessableEntityError('username is invalid');

      return c.json({ profile }, 200);
    }
  );

  return router;
};
