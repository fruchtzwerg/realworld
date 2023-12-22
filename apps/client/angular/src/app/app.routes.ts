import { Route } from '@angular/router';

import { articleRoutes } from '../modules/article/router/article.routes';
import { authRoutes } from '../modules/auth/router/auth.routes';
import { feedRoutes } from '../modules/feed/router/feed.routes';
import { userRoutes } from '../modules/user/router/user.routes';

export const appRoutes: Route[] = [
  ...feedRoutes,
  ...authRoutes,
  ...userRoutes,
  ...articleRoutes,
  { path: '**', redirectTo: '/home' },
];
