import type { Provider } from '@nestjs/common';

import {
  ArticleService,
  CommentService,
  Context,
  ProfileService,
  UserService,
  ArticleRepository,
  ArticleValidator,
  ProfileRepository,
  ProfileValidator,
  CommentRepository,
  CommentValidator,
  UserRepository,
  UserValidator,
} from '@realworld/core';

export const ServiceProviders: Provider[] = [
  {
    provide: ArticleService,
    useFactory: (ctx: Context, repository: ArticleRepository, validator: ArticleValidator) =>
      new ArticleService(ctx, repository, validator),
    inject: [Context, ArticleRepository, ArticleValidator],
  },
  {
    provide: CommentService,
    useFactory: (ctx: Context, repository: CommentRepository, validator: CommentValidator) =>
      new CommentService(ctx, repository, validator),
    inject: [Context, CommentRepository, CommentValidator],
  },
  {
    provide: ProfileService,
    useFactory: (ctx: Context, repository: ProfileRepository, validator: ProfileValidator) =>
      new ProfileService(ctx, repository, validator),
    inject: [Context, ProfileRepository, ProfileValidator],
  },
  {
    provide: UserService,
    useFactory: (ctx: Context, repository: UserRepository, validator: UserValidator) =>
      new UserService(ctx, repository, validator),
    inject: [Context, UserRepository, UserValidator],
  },
];
