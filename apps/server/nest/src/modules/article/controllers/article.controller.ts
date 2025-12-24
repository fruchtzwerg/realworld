import { Controller, Delete } from '@nestjs/common';
import { implement, Implement } from '@orpc/nest';

import { ArticleService } from '@realworld/core';
import { User, contract } from '@realworld/dto';

import { Payload } from '../../auth/decorators/payload.decorator';
import { Public } from '../../auth/decorators/public.decorator';

@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Implement(contract.article.getFeed)
  async getFeed() {
    return implement(contract.article.getFeed).handler(async ({ input }) => {
      const articles = await this.articleService.getFeed(input.query);
      const articlesCount = await this.articleService.getArticlesCount();

      return { articles, articlesCount };
    });
  }

  @Public()
  @Implement(contract.article.getArticles)
  async getArticles() {
    return implement(contract.article.getArticles).handler(async ({ input }) => {
      const articles = await this.articleService.getArticles(input.query);
      const articlesCount = await this.articleService.getArticlesCount();

      return { articles, articlesCount };
    });
  }

  @Public()
  @Implement(contract.article.getArticle)
  async getArticle() {
    return implement(contract.article.getArticle).handler(async ({ input, errors }) => {
      const article = await this.articleService.getArticle(input.params.slug);

      if (!article) {
        throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['article not found'] } } });
      }

      return { article };
    });
  }

  @Implement(contract.article.createArticle)
  async createArticle(@Payload('email') email: User['email']) {
    return implement(contract.article.createArticle).handler(async ({ input, errors }) => {
      const article = await this.articleService.createArticle(input.body, email);

      if (!article) {
        throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['user not found'] } } });
      }

      return { article };
    });
  }

  @Implement(contract.article.updateArticle)
  async updateArticle() {
    return implement(contract.article.updateArticle).handler(async ({ input, errors }) => {
      const article = await this.articleService.updateArticle(input.params.slug, input.body);

      if (!article) {
        throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['article not found'] } } });
      }

      return { article };
    });
  }

  @Implement(contract.article.deleteArticle)
  async deleteArticle() {
    return implement(contract.article.deleteArticle).handler(async ({ input }) => {
      await this.articleService.deleteArticle(input.params.slug);
    });
  }

  @Implement(contract.favorites.setFavorite)
  async setFavorite() {
    return implement(contract.favorites.setFavorite).handler(async ({ input, errors }) => {
      const article = await this.articleService.setFavorite(input.params.slug);

      if (!article) {
        throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['article not found'] } } });
      }

      return { article };
    });
  }

  @Implement(contract.favorites.deleteFavorite)
  async unsetFavorite() {
    return implement(contract.favorites.deleteFavorite).handler(async ({ input, errors }) => {
      const article = await this.articleService.unsetFavorite(input.params.slug);

      if (!article) {
        throw errors.UNPROCESSABLE_CONTENT({ data: { errors: { body: ['article not found'] } } });
      }

      return { article };
    });
  }

  @Public()
  @Delete('articles')
  deleteArticles() {
    return this.articleService.deleteAll();
  }
}
