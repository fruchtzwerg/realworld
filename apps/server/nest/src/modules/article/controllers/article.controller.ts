import { Controller, Delete } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';

import { ArticleService } from '@realworld/common';
import { User, contract } from '@realworld/dto';

import { Payload } from '../../auth/decorators/payload.decorator';
import { Public } from '../../auth/decorators/public.decorator';
import { AuthService } from '../../auth/services/auth.service';
import { ArticleService } from '../services/article.service';

@Controller()
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly authService: AuthService
  ) {}

  @TsRestHandler(contract.article.getFeed)
  async getFeed(@Payload('username') username: User['username']) {
    return tsRestHandler(contract.article.getFeed, async ({ query }) => {
      const articles = await this.articleService.getFeed(query, username);
      const articlesCount = await this.articleService.getArticlesCount();

      return {
        status: 200,
        body: { articles, articlesCount },
      };
    });
  }

  @Public()
  @TsRestHandler(contract.article.getArticles)
  async getArticles(@Payload('username') username?: User['username']) {
    return tsRestHandler(contract.article.getArticles, async ({ query }) => {
      const articles = await this.articleService.getArticles(query, username);
      const articlesCount = await this.articleService.getArticlesCount();

      return {
        status: 200,
        body: { articles, articlesCount },
      };
    });
  }

  @Public()
  @TsRestHandler(contract.article.getArticle)
  async getArticle(@Payload('username') username?: User['username']) {
    return tsRestHandler(contract.article.getArticle, async ({ params }) => {
      const article = await this.articleService.getArticle(params.slug, username);

      if (!article)
        return {
          status: 422,
          body: { errors: { body: ['article not found'] } },
        };

      return { status: 200, body: { article } };
    });
  }

  @TsRestHandler(contract.article.createArticle)
  async createArticle(@Payload('email') email: User['email']) {
    return tsRestHandler(contract.article.createArticle, async ({ body }) => {
      const author = await this.authService.getUserByEmailRaw(email);
      const article = await this.articleService.createArticle(body, author!);

      return { status: 201, body: { article } };
    });
  }

  @TsRestHandler(contract.article.updateArticle)
  async updateArticle(@Payload('username') username: User['username']) {
    return tsRestHandler(contract.article.updateArticle, async ({ params, body }) => {
      const article = await this.articleService.updateArticle(params.slug, body, username);

      if (!article)
        return {
          status: 422,
          body: { errors: { body: ['article not found'] } },
        };

      return { status: 200, body: { article } };
    });
  }

  @TsRestHandler(contract.article.deleteArticle)
  async deleteArticle() {
    return tsRestHandler(contract.article.deleteArticle, async ({ params }) => {
      await this.articleService.deleteArticle(params.slug);

      return { status: 200, body: null };
    });
  }

  @TsRestHandler(contract.favorites.setFavorite)
  async setFavorite(@Payload('username') username: User['username']) {
    return tsRestHandler(contract.favorites.setFavorite, async ({ params }) => {
      const article = await this.articleService.setFavorite(params.slug, username);

      if (!article)
        return {
          status: 422,
          body: { errors: { body: ['article not found'] } },
        };

      return { status: 200, body: { article } };
    });
  }

  @TsRestHandler(contract.favorites.deleteFavorite)
  async unsetFavorite(@Payload('username') username: User['username']) {
    return tsRestHandler(contract.favorites.deleteFavorite, async ({ params }) => {
      const article = await this.articleService.unsetFavorite(params.slug, username);

      if (!article)
        return {
          status: 422,
          body: { errors: { body: ['article not found'] } },
        };

      return { status: 200, body: { article } };
    });
  }

  @Public()
  @Delete('articles')
  deleteArticles() {
    return this.articleService.deleteAll();
  }
}
