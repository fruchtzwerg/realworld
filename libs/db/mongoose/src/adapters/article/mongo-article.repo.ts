import { Model } from 'mongoose';
import { z } from 'zod';

import { ArticleRepository } from '@realworld/core';
import {
  Article,
  ArticleSchema,
  ArticlesQuery,
  CreateArticleDto,
  FeedQuery,
  UpdateArticleDto,
  User,
} from '@realworld/dto';
import { shallowSparse } from '@realworld/utils';

import { UserModel } from '../user/mongo-user.model';

import { ArticleModel } from './mongo-article.model';

const ArticlesDbQuery = z
  .object({
    author: z.string(),
    favoritedBy: z.string(),
    tagList: z.string(),
  })
  .partial();

export class MongoArticleRepository extends ArticleRepository {
  constructor(
    private readonly articleModel: Model<ArticleModel>,
    private readonly userModel: Model<UserModel>
  ) {
    super();
  }

  private transform(articleModel: ArticleModel, username?: User['username']): Article {
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

  override count(): Promise<number> {
    return this.articleModel.countDocuments();
  }

  override async getFeed(query: FeedQuery, username: User['username']): Promise<Article[]> {
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

    return articlesRaw.map((article) => this.transform(article, username));
  }

  override async findMany(query: ArticlesQuery, username?: User['username']): Promise<Article[]> {
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

    return articlesRaw.map((article) => this.transform(article, username));
  }

  override async findUnique(
    slug: Article['slug'],
    username?: User['username']
  ): Promise<Article | null> {
    const article = await this.articleModel.findOne({ slug });
    if (!article) return null;

    return this.transform(article, username);
  }

  override async create(
    articleDto: CreateArticleDto,
    slug: Article['slug'],
    email: User['email'],
    username: User['username']
  ): Promise<Article | null> {
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) return null;

    // remove empty string tags
    articleDto.article.tagList = Array.from(new Set(articleDto.article.tagList.filter(Boolean)));

    const createdArticle = await this.articleModel.create({ ...articleDto.article, slug });
    createdArticle.author = user;

    const article = await createdArticle.save();

    return this.transform(article, username);
  }

  override async update(
    slug: Article['slug'],
    articleDto: UpdateArticleDto,
    username: User['username']
  ): Promise<Article | null> {
    const article = await this.articleModel.findOneAndUpdate({ slug }, articleDto.article, {
      new: true,
    });
    if (!article) return null;

    return this.transform(article, username);
  }

  override async delete(slug: Article['slug']): Promise<void> {
    await this.articleModel.deleteOne({ slug });
  }

  override async setFavorite(
    slug: Article['slug'],
    username: User['username']
  ): Promise<Article | null> {
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

  override async unsetFavorite(
    slug: Article['slug'],
    username: User['username']
  ): Promise<Article | null> {
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

  override async getTags(): Promise<string[]> {
    const articles = await this.articleModel.find().select('tagList');
    return articles.flatMap((article) => article.tagList);
  }

  override deleteAll(): Promise<unknown | null> {
    return this.articleModel.deleteMany();
  }
}
