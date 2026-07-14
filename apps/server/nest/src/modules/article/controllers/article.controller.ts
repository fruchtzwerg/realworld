import { Controller, Delete, Inject } from '@nestjs/common';
import { implement, Implement } from '@orpc/nest';

import type { HandlerContext } from '@realworld/api';
import { articleHandlers, favoritesHandlers } from '@realworld/api';
import type { Services } from '@realworld/core';
import { User, contract } from '@realworld/dto';

import { SERVICES } from '../../auth/auth.module';
import { Payload } from '../../auth/decorators/payload.decorator';
import { Public } from '../../auth/decorators/public.decorator';

@Controller()
export class ArticleController {
  constructor(@Inject(SERVICES) private readonly services: Services) {}

  @Implement(contract.article.getFeed)
  async getFeed() {
    return implement(contract.article.getFeed).handler(async ({ input }) => {
      return articleHandlers.getFeed(this.handlerCtx(), input.query);
    });
  }

  @Public()
  @Implement(contract.article.getArticles)
  async getArticles() {
    return implement(contract.article.getArticles).handler(async ({ input }) => {
      const ctx: HandlerContext = { services: this.services };
      return articleHandlers.getArticles(ctx, input.query);
    });
  }

  @Public()
  @Implement(contract.article.getArticle)
  async getArticle() {
    return implement(contract.article.getArticle).handler(async ({ input }) => {
      const ctx: HandlerContext = { services: this.services };
      return articleHandlers.getArticle(ctx, input.params);
    });
  }

  @Implement(contract.article.createArticle)
  async createArticle(@Payload() user: User) {
    return implement(contract.article.createArticle).handler(async ({ input }) => {
      return articleHandlers.createArticle(this.handlerCtx(user), input.body);
    });
  }

  @Implement(contract.article.updateArticle)
  async updateArticle() {
    return implement(contract.article.updateArticle).handler(async ({ input }) => {
      return articleHandlers.updateArticle(this.handlerCtx(), input.params, input.body);
    });
  }

  @Implement(contract.article.deleteArticle)
  async deleteArticle() {
    return implement(contract.article.deleteArticle).handler(async ({ input }) => {
      return articleHandlers.deleteArticle(this.handlerCtx(), input.params);
    });
  }

  @Implement(contract.favorites.setFavorite)
  async setFavorite() {
    return implement(contract.favorites.setFavorite).handler(async ({ input }) => {
      return favoritesHandlers.setFavorite(this.handlerCtx(), input.params);
    });
  }

  @Implement(contract.favorites.deleteFavorite)
  async unsetFavorite() {
    return implement(contract.favorites.deleteFavorite).handler(async ({ input }) => {
      return favoritesHandlers.deleteFavorite(this.handlerCtx(), input.params);
    });
  }

  @Public()
  @Delete('articles')
  deleteArticles() {
    return this.services.articleService.deleteAll();
  }

  private handlerCtx(user?: User): HandlerContext {
    return {
      services: this.services,
      user: user ? { username: user.username, email: user.email, token: user.token } : undefined,
    };
  }
}
