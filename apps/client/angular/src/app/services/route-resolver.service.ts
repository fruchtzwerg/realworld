import { Injectable, inject } from '@angular/core';
import { ActivationEnd, Params, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { ArticleService } from '../../modules/article/services/article.service';
import { FeedService } from '../../modules/feed/services/feed.service';
import { UserService } from '../../modules/user/services/user.service';

const paramsMapper =
  () =>
  ({ snapshot }: ActivationEnd) => {
    const params = [];
    params.push(snapshot.params);

    while (snapshot.firstChild) {
      snapshot = snapshot.firstChild;
      params.push(snapshot.params);
    }

    return params;
  };

const paramsReducer = () => (params: Params[]) =>
  params.reduce((acc, params) => Object.assign(acc, params), {});

const paramsExtractor = (mapper: Record<string, CallableFunction>) => (params: Params) => {
  Object.entries(mapper).forEach(([key, update]) => update(params[key]));
};

@Injectable({
  providedIn: 'root',
})
export class RouteResolverService {
  #router = inject(Router);

  #articleService = inject(ArticleService);
  #feedService = inject(FeedService);
  #profileService = inject(UserService);

  public subscribeRoutes() {
    const mapper: Record<string, CallableFunction> = {
      slug: this.#articleService.setSlug.bind(this.#articleService),
      tag: this.#feedService.setTag.bind(this.#feedService),
      username: this.#profileService.setUsername.bind(this.#profileService),
    };

    this.#router.events
      .pipe(
        filter((event: any) => event instanceof ActivationEnd),
        map(paramsMapper()),
        map(paramsReducer())
      )
      .subscribe(paramsExtractor(mapper));
  }
}
