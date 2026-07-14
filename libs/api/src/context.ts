import type { Services } from '@realworld/core';

/**
 * The authenticated user, supplied by the server's auth layer.
 * `token` is present for endpoints that echo it back (user CRUD).
 */
export interface CurrentUser {
  username: string;
  email: string;
  token?: string;
}

/**
 * Bundle of services + optional authenticated user.
 * Each server populates this from its own context mechanism
 * and passes it to the shared handlers.
 */
export interface HandlerContext {
  services: Services;
  user?: CurrentUser;
}
