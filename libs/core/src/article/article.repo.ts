import type {
  Article,
  ArticlesQuery,
  CreateArticleDto,
  FeedQuery,
  UpdateArticleDto,
  User,
} from '@realworld/dto';

export abstract class ArticleRepository {
  abstract count(): Promise<number>;
  abstract getFeed(query: FeedQuery, username: User['username']): Promise<unknown[]>;
  abstract findMany(query: ArticlesQuery, username?: User['username']): Promise<unknown[]>;
  abstract findUnique(slug: Article['slug'], username?: User['username']): Promise<unknown | null>;
  abstract create(
    articleDto: CreateArticleDto,
    slug: Article['slug'],
    email: User['email'],
    username: User['username']
  ): Promise<unknown>;
  abstract update(
    slug: Article['slug'],
    articleDto: UpdateArticleDto,
    username: User['username']
  ): Promise<unknown | null>;
  abstract delete(slug: Article['slug']): Promise<unknown>;
  abstract getTags(): Promise<string[]>;
  abstract deleteAll(): Promise<unknown>;
  abstract setFavorite(slug: Article['slug'], username: User['username']): Promise<unknown | null>;
  abstract unsetFavorite(
    slug: Article['slug'],
    username: User['username']
  ): Promise<unknown | null>;
}
