import { zValidator } from '@hono/zod-validator';

import { contract, UpdateUserDtoSchema } from '@realworld/dto';

import { UnprocessableEntityError } from '../../errors/unprocessable-entity.error';
import { factory } from '../../factory/app.factory';
import { openapi } from '../../utils/openapi.utils';
import { jwt } from '../auth';

export const createUserRouter = () => {
  const router = factory.createApp();

  /** Get current user */
  router.get('/', openapi(contract.user.getUser), jwt(), async (c) => {
    const { username } = c.get('jwtPayload');
    const { userService } = c.get('services');

    const user = await userService.getUserByUsername(username);
    if (!user) throw new UnprocessableEntityError();

    return c.json(user, 200);
  });

  /** Update user */
  router.put(
    '/',
    openapi(contract.user.updateUser),
    jwt(),
    zValidator('json', UpdateUserDtoSchema),
    async (c) => {
      const { username } = c.get('jwtPayload');
      const body = c.req.valid('json');
      const { userService } = c.get('services');

      const user = await userService.updateUser(username, body);
      return c.json(user, 200);
    }
  );

  return router;
};
