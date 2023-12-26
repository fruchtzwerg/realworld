import { Controller, Delete } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';

import { ArticleService } from '@realworld/common';
import { User, contract } from '@realworld/dto';

import { Payload } from '../../auth/decorators/payload.decorator';
import { Public } from '../../auth/decorators/public.decorator';

@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @TsRestHandler(contract.article.getFeed)
  async getFeed() {
    return tsRestHandler(contract.article.getFeed, async ({ query }) => {
      const articles = await this.articleService.getFeed(query);
      const articlesCount = await this.articleService.getArticlesCount();

      return {
        status: 200,
        body: { articles, articlesCount },
      };
    });
  }

  @Public()
  @TsRestHandler(contract.article.getArticles)
  async getArticles() {
    return tsRestHandler(contract.article.getArticles, async ({ query }) => {
      const articles = await this.articleService.getArticles(query);
      const articlesCount = await this.articleService.getArticlesCount();

      return {
        status: 200,
        body: { articles, articlesCount },
      };
    });
  }

  @Public()
  @TsRestHandler(contract.article.getArticle)
  async getArticle() {
    return tsRestHandler(contract.article.getArticle, async ({ params }) => {
      const article = await this.articleService.getArticle(params.slug);

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
      const article = await this.articleService.createArticle(body, email);

      if (!article)
        return {
          status: 422,
          body: { errors: { body: ['user not found'] } },
        };

      return { status: 201, body: { article } };
    });
  }

  @TsRestHandler(contract.article.updateArticle)
  async updateArticle() {
    return tsRestHandler(contract.article.updateArticle, async ({ params, body }) => {
      const article = await this.articleService.updateArticle(params.slug, body);

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
  async setFavorite() {
    return tsRestHandler(contract.favorites.setFavorite, async ({ params }) => {
      const article = await this.articleService.setFavorite(params.slug);

      if (!article)
        return {
          status: 422,
          body: { errors: { body: ['article not found'] } },
        };

      return { status: 200, body: { article } };
    });
  }

  @TsRestHandler(contract.favorites.deleteFavorite)
  async unsetFavorite() {
    return tsRestHandler(contract.favorites.deleteFavorite, async ({ params }) => {
      const article = await this.articleService.unsetFavorite(params.slug);

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
