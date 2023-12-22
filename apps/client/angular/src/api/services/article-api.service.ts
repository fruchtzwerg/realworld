import { Injectable } from '@angular/core';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { from, map } from 'rxjs';

import {
  Article,
  ArticleDto,
  ArticleParams,
  ArticlesDto,
  ArticlesQuery,
  CreateArticle,
  CreateCommentDto,
  FeedQuery,
  TagsDto,
} from '@realworld/dto';
import { shallowSparse } from '@realworld/utils';

import { injectRestClient } from '../providers/rest-client.provider';
import { ApiError } from '../utils/api.error';

const updateArticlesCache =
  <T extends string | Article>(
    ...[articleOrSlug, favorited]: T extends string ? [T, boolean] : [T]
  ) =>
  (dto?: ArticlesDto): ArticlesDto => {
    const isSlug = typeof articleOrSlug === 'string';
    const slug = isSlug ? articleOrSlug : articleOrSlug.slug;

    const getArticle = (original: Article) =>
      isSlug
        ? {
            ...original,
            favorited: favorited ?? !original.favorited,
            favoritesCount: original.favoritesCount + (favorited ? 1 : -1),
          }
        : articleOrSlug;

    return {
      ...dto!,
      articles: dto!.articles.map((original) =>
        original.slug === slug ? getArticle(original) : original
      ),
    };
  };

@Injectable({
  providedIn: 'root',
})
export class ArticleApiService {
  #client = injectRestClient();
  #queryClient = injectQueryClient();
  #query = injectQuery();
  #mutation = injectMutation();

  /** Fetch a single article. */
  public getArticle(slug?: Article['slug']) {
    return this.#query({
      queryKey: ['article', slug] as const,
      queryFn: () =>
        from(this.#client.article.getArticle({ params: { slug: slug! } })).pipe(
          map((res) => {
            if (res.status === 200) return res.body.article;
            throw new ApiError('getArticle', res.status);
          })
        ),
      enabled: !!slug,
    });
  }

  /** Fetch the feed of articles of the current user by filter. */
  public getFeed(filter: FeedQuery) {
    const query = shallowSparse({ limit: 10, ...filter });

    return this.#query({
      queryKey: ['feed', query] as const,
      queryFn: () =>
        from(this.#client.article.getFeed({ query })).pipe(
          map((res) => {
            if (res.status === 200) return res.body;
            throw new ApiError('getFeed', res.status);
          })
        ),
      staleTime: 60 * 1_000,
    });
  }

  /** Fetch all articles by filter. */
  public getArticles(filter: ArticlesQuery) {
    const query = shallowSparse({ limit: 10, ...filter });

    return this.#query({
      queryKey: ['articles', query] as const,
      queryFn: () =>
        from(this.#client.article.getArticles({ query })).pipe(
          map((res) => {
            if (res.status === 200) return res.body;
            throw new ApiError('getArticles', res.status);
          })
        ),
      staleTime: 60 * 1_000,
    });
  }

  /** Create an article. */
  public createArticle() {
    return this.#mutation({
      mutationFn: (article: CreateArticle) =>
        from(this.#client.article.createArticle({ body: { article } })).pipe(
          map((res) => {
            if (res.status === 201) return res.body;
            throw new ApiError('createArticle', res.status);
          })
        ),
      onSuccess: () => {
        ['articles', 'feed'].forEach((queryKey) =>
          this.#queryClient.invalidateQueries({ queryKey: [queryKey] })
        );
      },
    });
  }

  /** Favorite an article. */
  public favoriteArticle() {
    return this.#mutation({
      mutationFn: ({ slug }: ArticleParams) =>
        from(this.#client.favorites.setFavorite({ params: { slug } })).pipe(
          map((res) => {
            if (res.status === 200) return res.body;
            throw new ApiError('setFavorite', res.status);
          })
        ),
      onMutate: this.onFavoriteChanges(true),
      onSuccess: this.onFavoriteSuccess(),
    });
  }

  /** Unfavorite an article. */
  public unfavoriteArticle() {
    return this.#mutation({
      mutationFn: ({ slug }: ArticleParams) =>
        from(this.#client.favorites.deleteFavorite({ params: { slug } })).pipe(
          map((res) => {
            if (res.status === 200) return res.body;
            throw new ApiError('deleteFavorite', res.status);
          })
        ),
      onMutate: this.onFavoriteChanges(false),
      onSuccess: this.onFavoriteSuccess(),
    });
  }

  /** Craete a comment on an article. */
  public createComment() {
    return this.#mutation({
      mutationFn: ({ slug, comment }: ArticleParams & CreateCommentDto) =>
        from(this.#client.comments.createComment({ params: { slug }, body: { comment } })).pipe(
          map((res) => {
            if (res.status === 200) return res.body;
            throw new ApiError('createComment', res.status);
          })
        ),
      onSuccess: () => {
        [['comments']].forEach((queryKey) => this.#queryClient.invalidateQueries({ queryKey }));
      },
    });
  }

  /** Delete a comment of the current user from an article. */
  public deleteComment() {
    return this.#mutation({
      mutationFn: (params: ArticleParams & { id: number }) =>
        from(this.#client.comments.deleteComment({ params })).pipe(
          map((res) => {
            if (res.status === 200) return res.body;
            throw new ApiError('deleteComment', res.status);
          })
        ),
      onSuccess: () => {
        [['comments']].forEach((queryKey) => this.#queryClient.invalidateQueries({ queryKey }));
      },
    });
  }

  /** Get list of comments for an article. */
  public getComments(params: ArticleParams) {
    return this.#query({
      queryKey: ['comments', params.slug] as const,
      queryFn: () =>
        from(this.#client.comments.getComments({ params })).pipe(
          map((res) => {
            if (res.status === 200) return res.body.comments;
            throw new ApiError('getComments', res.status);
          })
        ),
    });
  }

  /** Get all tags. */
  public getTags() {
    return this.#query<TagsDto['tags']>({
      queryKey: ['tags'] as const,
      queryFn: () =>
        from(this.#client.tags.getTags()).pipe(
          map((res) => {
            if (res.status === 200) return res.body.tags;
            throw new ApiError('getTags', res.status);
          })
        ),
      staleTime: 60 * 1_000,
    });
  }

  /** Update articles cache optimistically. */
  private onFavoriteChanges(favorited: Article['favorited']) {
    return ({ slug }: ArticleParams) => {
      // update article
      this.#queryClient.setQueriesData<Article>({ queryKey: ['article'] }, (article) => ({
        ...article!,
        favorited,
        favoritesCount: article!.favoritesCount + (favorited ? 1 : -1),
      }));
      // update list
      [['articles'], ['feed']].forEach((queryKey) =>
        this.#queryClient.setQueriesData<ArticlesDto>(
          { queryKey },
          updateArticlesCache(slug, favorited)
        )
      );
    };
  }

  /** Update articles cache on success. */
  private onFavoriteSuccess() {
    return ({ article }: ArticleDto) => {
      this.#queryClient.setQueryData(['article', article.slug], article);
      [['articles'], ['feed']].forEach((queryKey) =>
        this.#queryClient.setQueriesData<ArticlesDto>({ queryKey }, updateArticlesCache(article))
      );
      this.#queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === 'articles' && !!(query.queryKey[1] as ArticlesQuery)?.favorited,
      });
    };
  }
}
