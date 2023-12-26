import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClsService } from 'nestjs-cls';
import { z } from 'zod';

import { ArticleService } from '@realworld/common';
import {
  Article,
  ArticleSchema,
  ArticlesQuery,
  CreateArticleDto,
  FeedQuery,
  ResolvedPayloadDto,
  UpdateArticleDto,
  User,
} from '@realworld/dto';
import { shallowSparse } from '@realworld/utils';

import { ArticleModel } from '../models/article.model';
import { UserModel } from '../models/user.model';

const ArticlesDbQuery = z
  .object({
    author: z.string(),
    favoritedBy: z.string(),
    tagList: z.string(),
  })
  .partial();

@Injectable()
export class MongoArticleService extends ArticleService {
  constructor(
    @InjectModel(ArticleModel.name)
    private readonly articleModel: Model<ArticleModel>,
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
    private readonly store: ClsService<ResolvedPayloadDto>
  ) {
    super();
  }

  private transform(articleModel: ArticleModel): Article {
    const username = this.store.get('user.username');
    const article = ArticleSchema.partial({
      favorited: true,
      favoritesCount: true,
    })
      .merge(
        z.object({
          author: ArticleSchema.shape.author.partial({ following: true }),
        })
      )
      .parse(articleModel);

    article.favorited = username
      ? articleModel.favoritedBy.some((a) => a.username === username)
      : false;
    article.favoritesCount = articleModel.favoritedBy.length;
    article.author.following = articleModel.author.followers.some(
      (follower) => follower.username === username
    );

    return ArticleSchema.parse(article);
  }

  async getArticlesCount(): Promise<number> {
    return this.articleModel.countDocuments();
  }

  async getFeed(query: FeedQuery): Promise<Article[]> {
    const username = this.store.get('user.username');
    const user = await this.userModel.findOne({ username });
    if (!user) return [];

    const followedUsers = await this.userModel.find({ followers: user.id });
    if (!followedUsers) return [];

    const articlesRaw = await this.articleModel
      .find({ author: { $in: followedUsers } })
      .skip(query.offset!)
      .limit(query.limit!)
      .sort({ updatedAt: 'desc' })
      .exec();

    const articles = articlesRaw.map((article) => this.transform(article));

    return ArticleSchema.array().parse(articles);
  }

  async getArticles(query: ArticlesQuery): Promise<Article[]> {
    const author = await this.userModel.findOne({ username: query.author });
    if (query.author && !author) return [];

    const favoritedBy = await this.userModel.findOne({
      username: query.favorited,
    });
    if (query.favorited && !favoritedBy) return [];

    const parsedQuery = ArticlesDbQuery.parse({
      author: author?.id,
      favoritedBy: favoritedBy?.id,
      tagList: query.tag,
    });

    const normalizedQuery = shallowSparse(parsedQuery);

    const articlesRaw = await this.articleModel
      .find(normalizedQuery)
      .skip(query.offset!)
      .limit(query.limit!)
      .sort({ updatedAt: 'desc' })
      .exec();

    const articles = articlesRaw.map((article) => this.transform(article));

    return ArticleSchema.array().parse(articles);
  }

  async getArticle(slug: Article['slug']): Promise<Article | null> {
    const article = await this.articleModel.findOne({ slug });

    if (!article) return null;

    return this.transform(article);
  }

  async createArticle(
    articleDto: CreateArticleDto,
    email: User['username']
  ): Promise<Article | null> {
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) return null;

    // remove empty string tags
    articleDto.article.tagList = Array.from(new Set(articleDto.article.tagList.filter(Boolean)));

    const createdArticle = await this.articleModel.create(articleDto.article);
    createdArticle.author = user;

    const article = await createdArticle.save();

    return this.transform(article);
  }

  async updateArticle(
    slug: Article['slug'],
    articleDto: UpdateArticleDto
  ): Promise<Article | null> {
    const article = await this.articleModel.findOneAndUpdate({ slug }, articleDto.article, {
      new: true,
    });
    if (!article) return null;

    return this.transform(article);
  }

  async deleteArticle(slug: Article['slug']): Promise<void> {
    await this.articleModel.deleteOne({ slug });
  }

  async setFavorite(slug: Article['slug']): Promise<Article | null> {
    const username = this.store.get('user.username');
    const user = await this.userModel.findOne({ username });
    if (!user) return null;

    const article = await this.articleModel.findOneAndUpdate(
      { slug },
      { $addToSet: { favoritedBy: user } },
      { new: true }
    );
    if (!article) return null;

    return this.transform(article);
  }

  async unsetFavorite(slug: Article['slug']): Promise<Article | null> {
    const username = this.store.get('user.username');
    const user = await this.userModel.findOne({ username });
    if (!user) return null;

    const article = await this.articleModel.findOneAndUpdate(
      { slug },
      { $pull: { favoritedBy: user.id } },
      { new: true }
    );
    if (!article) return null;

    return this.transform(article);
  }

  async getTags(): Promise<string[]> {
    const articles = await this.articleModel.find().select('tagList');
    const tags = articles.flatMap((article) => article.tagList);

    return [...new Set(tags)];
  }

  async deleteAll(): Promise<void> {
    await this.articleModel.deleteMany();
  }
}
