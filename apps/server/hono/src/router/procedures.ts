import type { HandlerContext } from '@realworld/api';
import {
  articleHandlers,
  commentHandlers,
  favoritesHandlers,
  profileHandlers,
  tagHandlers,
  userHandlers,
} from '@realworld/api';

import { os } from './builder';
import type { RouterContext } from './context';
import { authRequired } from './middleware/auth';
import { errorHandler } from './middleware/errors';

/** Build the framework-neutral HandlerContext from the oRPC router context. */
const toHandlerCtx = (ctx: RouterContext): HandlerContext => ({
  services: ctx.services,
  user: ctx.user ? { ...ctx.user, token: ctx.token } : undefined,
});

export const router = os.use(errorHandler).router({
  user: {
    getUser: os.user.getUser
      .use(authRequired)
      .handler(async ({ context }) => userHandlers.getUser(toHandlerCtx(context))),
    updateUser: os.user.updateUser
      .use(authRequired)
      .handler(async ({ context, input }) =>
        userHandlers.updateUser(toHandlerCtx(context), input.body)
      ),
    createUser: os.user.createUser.handler(async ({ context, input }) =>
      userHandlers.createUser(toHandlerCtx(context), input.body)
    ),
    login: os.user.login.handler(async ({ context, input }) =>
      userHandlers.login(toHandlerCtx(context), input.body)
    ),
  },
  article: {
    getFeed: os.article.getFeed
      .use(authRequired)
      .handler(async ({ context, input }) =>
        articleHandlers.getFeed(toHandlerCtx(context), input.query)
      ),
    getArticles: os.article.getArticles.handler(async ({ context, input }) =>
      articleHandlers.getArticles(toHandlerCtx(context), input.query)
    ),
    getArticle: os.article.getArticle.handler(async ({ context, input }) =>
      articleHandlers.getArticle(toHandlerCtx(context), input.params)
    ),
    createArticle: os.article.createArticle
      .use(authRequired)
      .handler(async ({ context, input }) =>
        articleHandlers.createArticle(toHandlerCtx(context), input.body)
      ),
    updateArticle: os.article.updateArticle
      .use(authRequired)
      .handler(async ({ context, input }) =>
        articleHandlers.updateArticle(toHandlerCtx(context), input.params, input.body)
      ),
    deleteArticle: os.article.deleteArticle
      .use(authRequired)
      .handler(async ({ context, input }) =>
        articleHandlers.deleteArticle(toHandlerCtx(context), input.params)
      ),
  },
  favorites: {
    setFavorite: os.favorites.setFavorite
      .use(authRequired)
      .handler(async ({ context, input }) =>
        favoritesHandlers.setFavorite(toHandlerCtx(context), input.params)
      ),
    deleteFavorite: os.favorites.deleteFavorite
      .use(authRequired)
      .handler(async ({ context, input }) =>
        favoritesHandlers.deleteFavorite(toHandlerCtx(context), input.params)
      ),
  },
  comments: {
    getComments: os.comments.getComments.handler(async ({ context, input }) =>
      commentHandlers.getComments(toHandlerCtx(context), input.params)
    ),
    createComment: os.comments.createComment
      .use(authRequired)
      .handler(async ({ context, input }) =>
        commentHandlers.createComment(toHandlerCtx(context), input.params, input.body)
      ),
    deleteComment: os.comments.deleteComment
      .use(authRequired)
      .handler(async ({ context, input }) =>
        commentHandlers.deleteComment(toHandlerCtx(context), input.params)
      ),
  },
  profile: {
    getProfile: os.profile.getProfile.handler(async ({ context, input }) =>
      profileHandlers.getProfile(toHandlerCtx(context), input.params)
    ),
    followUser: os.profile.followUser
      .use(authRequired)
      .handler(async ({ context, input }) =>
        profileHandlers.followUser(toHandlerCtx(context), input.params)
      ),
    unfollowUser: os.profile.unfollowUser
      .use(authRequired)
      .handler(async ({ context, input }) =>
        profileHandlers.unfollowUser(toHandlerCtx(context), input.params)
      ),
  },
  tags: {
    getTags: os.tags.getTags.handler(async ({ context }) =>
      tagHandlers.getTags(toHandlerCtx(context))
    ),
  },
});
