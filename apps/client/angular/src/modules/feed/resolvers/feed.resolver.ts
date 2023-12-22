import { ResolveFn } from '@angular/router';
import { QueryObserverResult } from '@ngneat/query';
import { Result } from '@ngneat/query/lib/types';

import { ArticlesDto } from '@realworld/dto';

import { injectArticleApi } from '../../../api/api.module';

export const feedResolver: ResolveFn<Result<QueryObserverResult<ArticlesDto>>> = () => {
  return injectArticleApi().getFeed({ limit: 10 });
};
