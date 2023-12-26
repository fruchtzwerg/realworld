import {
  Article,
  ArticlesQuery,
  CreateArticleDto,
  FeedQuery,
  UpdateArticleDto,
} from '../models/article.dto';
import { User } from '../models/user.dto';

export interface ArticleCrudService {
  /** Get articles total count. */
  getArticlesCount(): Promise<number>;
  /** Get feed articles. */
  getFeed(query: FeedQuery): Promise<Article[]>;
  /** Get recent articles. */
  getArticles(query: ArticlesQuery): Promise<Article[]>;
  /** Get a single article. */
  getArticle(slug: Article['slug']): Promise<Article | null>;
  /** Create an article. */
  createArticle(articleDto: CreateArticleDto, email: User['username']): Promise<Article | null>;
  /** Update an article. */
  updateArticle(slug: Article['slug'], articleDto: UpdateArticleDto): Promise<Article | null>;
  /** Delete an article. */
  deleteArticle(slug: Article['slug']): Promise<void>;
  /** Favorite an article. */
  setFavorite(slug: Article['slug']): Promise<Article | null>;
  /** Unfavorite an article. */
  unsetFavorite(slug: Article['slug']): Promise<Article | null>;
  /** Get tags. */
  getTags(): Promise<string[]>;
  /** Delete all articles */
  deleteAll(): Promise<void>;
}
