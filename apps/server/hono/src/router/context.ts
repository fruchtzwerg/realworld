import type { ArticleService, AuthService, CommentService, ProfileService, UserService } from '@realworld/core';
import type { ExtendedPrismaClient } from '@realworld/prisma';

export interface AuthUser {
  username: string;
  email: string;
}

export interface Services {
  userService: UserService;
  authService: AuthService;
  profileService: ProfileService;
  articleService: ArticleService;
  commentService: CommentService;
}

export interface RouterContext {
  headers: Headers;
  prisma: ExtendedPrismaClient;
  services: Services;
  user?: AuthUser;
  token?: string;
}
