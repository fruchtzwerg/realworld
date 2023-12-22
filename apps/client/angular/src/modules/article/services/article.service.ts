import { Injectable } from '@angular/core';
import { ReplaySubject, distinctUntilChanged, filter, map, shareReplay, switchMap } from 'rxjs';

import { Article } from '@realworld/dto';
import { NullableString } from '@realworld/utils';

import { injectArticleApi } from '../../../api/api.module';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  #api = injectArticleApi();

  #slug$ = new ReplaySubject<NullableString>(1);

  public setSlug(value: NullableString) {
    this.#slug$.next(value);
  }

  public readonly slug$ = this.#slug$.pipe(distinctUntilChanged());

  public readonly articleQuery$ = this.slug$.pipe(
    filter(Boolean),
    switchMap((slug) => this.#api.getArticle(slug).result$),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  public readonly article$ = this.articleQuery$.pipe(
    filter((res) => res.isSuccess),
    map((res) => res.data!)
  );

  public readonly createArticleMut = this.#api.createArticle();
  public readonly createArticle$ = this.createArticleMut.result$;

  public readonly createCommentMut = this.#api.createComment();
  public readonly createComment$ = this.createCommentMut.result$;

  public readonly commentsQuery$ = this.slug$.pipe(
    filter(Boolean),
    switchMap((slug) => this.#api.getComments({ slug }).result$),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  public readonly comments$ = this.commentsQuery$.pipe(
    filter((res) => res.isSuccess),
    map((res) => res.data!)
  );

  public readonly deleteCommentMut = this.#api.deleteComment();
  public readonly deleteComment$ = this.deleteCommentMut.result$;

  public readonly dislikeMut = this.#api.unfavoriteArticle();
  public readonly likeMut = this.#api.favoriteArticle();

  public toggleLike(article: Article) {
    const action = article.favorited ? this.dislikeMut : this.likeMut;
    return action.mutate({ slug: article.slug });
  }
}
