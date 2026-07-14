import { ORPCError } from '@orpc/server';

import { NotFoundError, UnauthorizedError } from '@realworld/core';

import { os } from '../builder';

/**
 * Maps framework-agnostic domain errors thrown by `@realworld/core` services
 * into oRPC errors. Applied globally to the router so handlers can throw plain
 * domain errors instead of oRPC-specific ones.
 */
export const errorHandler = os.middleware(async ({ next }) => {
  try {
    return await next();
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      throw new ORPCError('UNAUTHORIZED', { message: err.message });
    }

    if (err instanceof NotFoundError) {
      throw new ORPCError('UNPROCESSABLE_CONTENT', { data: { errors: { body: [err.message] } } });
    }

    throw err;
  }
});
