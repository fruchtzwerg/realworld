import { zValidator } from '@hono/zod-validator';

import { contract, CreateUserDtoSchema, LoginUserDtoSchema } from '@realworld/dto';

import { HttpError } from '../../errors/http.error';
import { factory } from '../../factory/app.factory';
import { openapi } from '../../utils/openapi.utils';

export const createAuthRouter = () => {
  const router = factory.createApp();

  router.post(
    '/',
    openapi(contract.user.createUser),
    zValidator('json', CreateUserDtoSchema),
    async (c) => {
      const { user } = c.req.valid('json');
      const { authService } = c.get('services');

      try {
        const created = await authService.authorize(user);
        return c.json(created, 200);
      } catch (err) {
        console.error(err);
        if (err instanceof HttpError) return c.json(err.body, err.status);

        return c.body(null, 401);
      }
    }
  );

  router.post(
    '/login',
    openapi(contract.user.login),
    zValidator('json', LoginUserDtoSchema),
    async (c) => {
      const { user } = c.req.valid('json');
      const { authService } = c.get('services');

      try {
        const payload = await authService.authenticate(user.email, user.password);
        return c.json(payload, 200);
      } catch (err) {
        console.error(err);
        if (err instanceof HttpError) return c.json(err.body, err.status);

        return c.body(null, 401);
      }
    }
  );

  return router;
};
