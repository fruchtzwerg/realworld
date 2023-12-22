import { Injectable } from '@angular/core';
import { ReplaySubject, combineLatest, distinctUntilChanged, filter, map, switchMap } from 'rxjs';

import { NullableString } from '@realworld/utils';

import { injectArticleApi } from '../../../api/api.module';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  #api = injectArticleApi();

  #tag = new ReplaySubject<NullableString>(1);
  #author = new ReplaySubject<NullableString>(1);
  #favorited = new ReplaySubject<NullableString>(1);

  public setTag(value: NullableString) {
    this.#tag.next(value);
  }
  public setAuthor(value: NullableString) {
    this.#author.next(value);
  }
  public setFavorited(value: NullableString) {
    this.#favorited.next(value);
  }

  public readonly tag$ = this.#tag.pipe(distinctUntilChanged(), filter(Boolean));
  public readonly author$ = this.#author.pipe(distinctUntilChanged(), filter(Boolean));
  public readonly favorited$ = this.#favorited.pipe(distinctUntilChanged(), filter(Boolean));

  public readonly tagsQuery$ = this.#api.getTags().result$;
  public readonly tags$ = this.tagsQuery$.pipe(
    filter((res) => res.isSuccess),
    map((res) => res.data!)
  );

  public readonly articlesQuery$ = combineLatest({
    tag: this.tag$,
    author: this.author$,
    favorited: this.favorited$,
  }).pipe(
    switchMap(
      ({ author, favorited, tag }) => this.#api.getArticles({ author, favorited, tag }).result$
    )
  );
  public readonly articles$ = this.articlesQuery$.pipe(
    filter((res) => res.isSuccess),
    map((res) => res.data!)
  );
}
