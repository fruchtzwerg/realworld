import { ResolveFn } from '@angular/router';
import { QueryObserverResult } from '@ngneat/query';

import { ArticlesDto } from '@realworld/dto';

import { injectArticleApi } from '../../../api/api.module';

export const articlesResolver: ResolveFn<Result<QueryObserverResult<ArticlesDto>>> = (route) => {
  const tag = route.params['tag'];
  return injectArticleApi().getArticles({ limit: 10, tag });
};
