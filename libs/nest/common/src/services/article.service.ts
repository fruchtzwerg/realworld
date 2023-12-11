import {
  Article,
  ArticlesQuery,
  CreateArticleDto,
  FeedQuery,
  UpdateArticleDto,
  User,
} from '@realworld/dto';

export abstract class ArticleService {
  /** Get articles total count. */
  abstract getArticlesCount(): Promise<number>;
  /** Get feed articles. */
  abstract getFeed(query: FeedQuery): Promise<Article[]>;
  /** Get recent articles. */
  abstract getArticles(query: ArticlesQuery): Promise<Article[]>;
  /** Get a single article. */
  abstract getArticle(slug: Article['slug']): Promise<Article | null>;
  /** Create an article. */
  abstract createArticle(
    articleDto: CreateArticleDto,
    email: User['username']
  ): Promise<Article | null>;
  /** Update an article. */
  abstract updateArticle(
    slug: Article['slug'],
    articleDto: UpdateArticleDto
  ): Promise<Article | null>;
  /** Delete an article. */
  abstract deleteArticle(slug: Article['slug']): Promise<void>;
  /** Favorite an article. */
  abstract setFavorite(slug: Article['slug']): Promise<Article | null>;
  /** Unfavorite an article. */
  abstract unsetFavorite(slug: Article['slug']): Promise<Article | null>;
  /** Get tags. */
  abstract getTags(): Promise<string[]>;
  /** Delete all articles */
  abstract deleteAll(): Promise<void>;
}
