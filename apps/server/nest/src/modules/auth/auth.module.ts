import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import {
  ArticleService,
  AuthService,
  CommentService,
  ProfileService,
  UserService,
  type Services,
} from '@realworld/core';

import { environment } from '../../environment/environment';
import { CoreModule } from '../core/core.module';

import { NestJwtSigner } from './jwt-signer';
import { JwtAuthGuardProvider } from './providers/jwt-auth.provider';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

export const SERVICES = Symbol('SERVICES');

@Module({
  imports: [
    CoreModule.forFeature(),
    PassportModule,
    JwtModule.register({
      secret: environment.jwt.secret,
      signOptions: { expiresIn: environment.jwt.expiresIn },
    }),
  ],
  providers: [
    NestJwtSigner,
    {
      provide: AuthService,
      useFactory: (signer: NestJwtSigner, userService: UserService) =>
        new AuthService(signer, userService),
      inject: [NestJwtSigner, UserService],
    },
    {
      provide: SERVICES,
      useFactory: (
        userService: UserService,
        authService: AuthService,
        profileService: ProfileService,
        articleService: ArticleService,
        commentService: CommentService
      ): Services => ({ userService, authService, profileService, articleService, commentService }),
      inject: [UserService, AuthService, ProfileService, ArticleService, CommentService],
    },
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuardProvider,
  ],
  exports: [AuthService, SERVICES],
})
export class AuthModule {}
