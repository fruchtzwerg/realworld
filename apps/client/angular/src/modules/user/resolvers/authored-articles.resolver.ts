import { ResolveFn } from '@angular/router';
import { QueryObserverResult } from '@ngneat/query';

import { ArticlesDto } from '@realworld/dto';

import { injectArticleApi } from '../../../api/api.module';

export const authoredArticlesResolver: ResolveFn<Result<QueryObserverResult<ArticlesDto>>> = (
  route
) => {
  const author = route.params['username'];
  return injectArticleApi().getArticles({ limit: 10, author });
};
