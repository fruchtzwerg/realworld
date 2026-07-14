import { ORPCError } from '@orpc/server';

import { os } from '../builder';

/**
 * Auth middleware for protected procedures. Throws UNAUTHORIZED if the
 * request has no valid JWT user. Narrows the context so downstream handlers
 * can use `context.user` without null checks.
 */
export const authRequired = os.middleware(async ({ context, next }) => {
  if (!context.user || !context.token) {
    throw new ORPCError('UNAUTHORIZED', { message: 'Authentication required' });
  }

  return next({ context: { user: context.user, token: context.token } });
});
