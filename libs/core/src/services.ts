import type { ArticleRepository } from './article/article.repo';
import { ArticleService } from './article/article.service';
import type { ArticleValidator } from './article/article.validator';
import { AuthService } from './auth/auth.service';
import type { JwtSigner } from './auth/jwt-signer';
import type { CommentRepository } from './comment/comment.repo';
import { CommentService } from './comment/comment.service';
import type { CommentValidator } from './comment/comment.validator';
import type { Context } from './common/context';
import type { ProfileRepository } from './profile/profile.repo';
import { ProfileService } from './profile/profile.service';
import type { ProfileValidator } from './profile/profile.validator';
import type { UserRepository } from './user/user.repo';
import { UserService } from './user/user.service';
import type { UserValidator } from './user/user.validator';

export interface Repositories {
  userRepository: UserRepository;
  profileRepository: ProfileRepository;
  articleRepository: ArticleRepository;
  commentRepository: CommentRepository;
}

export interface Validators {
  userValidator: UserValidator;
  profileValidator: ProfileValidator;
  articleValidator: ArticleValidator;
  commentValidator: CommentValidator;
}

export interface Services {
  userService: UserService;
  authService: AuthService;
  profileService: ProfileService;
  articleService: ArticleService;
  commentService: CommentService;
}

/**
 * Wire the domain service bundle. The `JwtSigner` is app-specific (Hono uses
 * `hono/jwt`, Nest uses `@nestjs/jwt`), so each server passes its own signer
 * implementation; the service wiring itself is shared.
 */
export const createServices = (
  ctx: Context,
  repos: Repositories,
  validators: Validators,
  jwtSigner: JwtSigner
): Services => {
  const userService = new UserService(repos.userRepository, validators.userValidator);
  const authService = new AuthService(jwtSigner, userService);

  return {
    userService,
    authService,
    profileService: new ProfileService(ctx, repos.profileRepository, validators.profileValidator),
    articleService: new ArticleService(ctx, repos.articleRepository, validators.articleValidator),
    commentService: new CommentService(ctx, repos.commentRepository, validators.commentValidator),
  };
};
