import { ORPCError } from '@orpc/server';
import { contract } from '@realworld/dto';

import type { AuthUser } from './context';
import { os } from './builder';

const requireUser = (user: AuthUser | undefined): AuthUser => {
  if (!user) throw new ORPCError('UNAUTHORIZED', { message: 'Authentication required' });
  return user;
};

export const router = os.router({
  user: {
    getUser: os.user.getUser.handler(async ({ context, errors }) => {
      const user = requireUser(context.user);
      const found = await context.services.userService.getUserByUsername(user.username);
      if (!found) throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['user not found'] } } });
      return { user: found };
    }),
    updateUser: os.user.updateUser.handler(async ({ context, input, errors }) => {
      const user = requireUser(context.user);
      const updated = await context.services.userService.updateUser(user.username, input.body);
      if (!updated) throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['user not found'] } } });
      return { user: updated };
    }),
    createUser: os.user.createUser.handler(async ({ context, input }) => {
      const token = await context.services.authService.authorize(input.body.user);
      const user = await context.services.userService.createUser(input.body);
      return { user: { ...user, token } };
    }),
    login: os.user.login.handler(async ({ context, input }) => {
      const user = await context.services.authService.authenticate(
        input.body.user.email,
        input.body.user.password
      );
      return { user };
    }),
  },
  article: {
    getFeed: os.article.getFeed.handler(async ({ context, input }) => {
      requireUser(context.user);
      const articles = await context.services.articleService.getFeed(input.query);
      const articlesCount = await context.services.articleService.getArticlesCount();
      return { articles, articlesCount };
    }),
    getArticles: os.article.getArticles.handler(async ({ context, input }) => {
      const articles = await context.services.articleService.getArticles(input.query);
      const articlesCount = await context.services.articleService.getArticlesCount();
      return { articles, articlesCount };
    }),
    getArticle: os.article.getArticle.handler(async ({ context, input, errors }) => {
      const article = await context.services.articleService.getArticle(input.params.slug);
      if (!article) throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['article not found'] } } });
      return { article };
    }),
    createArticle: os.article.createArticle.handler(async ({ context, input, errors }) => {
      const user = requireUser(context.user);
      const article = await context.services.articleService.createArticle(input.body, user.email);
      if (!article) throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['user not found'] } } });
      return { article };
    }),
    updateArticle: os.article.updateArticle.handler(async ({ context, input, errors }) => {
      const article = await context.services.articleService.updateArticle(input.params.slug, input.body);
      if (!article) throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['article not found'] } } });
      return { article };
    }),
    deleteArticle: os.article.deleteArticle.handler(async ({ context, input }) => {
      requireUser(context.user);
      await context.services.articleService.deleteArticle(input.params.slug);
    }),
  },
  favorites: {
    setFavorite: os.favorites.setFavorite.handler(async ({ context, input, errors }) => {
      requireUser(context.user);
      const article = await context.services.articleService.setFavorite(input.params.slug);
      if (!article) throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['article not found'] } } });
      return { article };
    }),
    deleteFavorite: os.favorites.deleteFavorite.handler(async ({ context, input, errors }) => {
      requireUser(context.user);
      const article = await context.services.articleService.unsetFavorite(input.params.slug);
      if (!article) throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['article not found'] } } });
      return { article };
    }),
  },
  comments: {
    getComments: os.comments.getComments.handler(async ({ context, input }) => {
      const comments = await context.services.commentService.getComments(input.params.slug);
      return { comments };
    }),
    createComment: os.comments.createComment.handler(async ({ context, input }) => {
      requireUser(context.user);
      const comment = await context.services.commentService.createComment(
        input.params.slug,
        input.body.comment
      );
      return { comment };
    }),
    deleteComment: os.comments.deleteComment.handler(async ({ context, input }) => {
      requireUser(context.user);
      await context.services.commentService.deleteComment(input.params.slug, input.params.id);
    }),
  },
  profile: {
    getProfile: os.profile.getProfile.handler(async ({ context, input, errors }) => {
      const profile = await context.services.profileService.getProfile(input.params.username);
      if (!profile) throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['profile not found'] } } });
      return { profile };
    }),
    followUser: os.profile.followUser.handler(async ({ context, input, errors }) => {
      requireUser(context.user);
      const profile = await context.services.profileService.followUser(input.params.username);
      if (!profile) throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['profile not found'] } } });
      return { profile };
    }),
    unfollowUser: os.profile.unfollowUser.handler(async ({ context, input, errors }) => {
      requireUser(context.user);
      const profile = await context.services.profileService.unfollowUser(input.params.username);
      if (!profile) throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['profile not found'] } } });
      return { profile };
    }),
  },
  tags: {
    getTags: os.tags.getTags.handler(async ({ context }) => {
      const tags = await context.services.articleService.getTags();
      return { tags };
    }),
  },
});
