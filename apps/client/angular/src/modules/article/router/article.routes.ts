import { Routes } from '@angular/router';

import { authorizedGuard } from '../../auth/guards/authorized.guard';

export const articleRoutes: Routes = [
  {
    path: 'editor',
    loadComponent: () =>
      import('../pages/create/create-article.page').then((m) => m.CreateArticlePage),
    canActivate: [authorizedGuard],
  },
  {
    path: 'article/:slug',
    loadComponent: () => import('../pages/article/article.page').then((m) => m.ArticlePage),
  },
  {
    path: 'article/:slug',
    loadComponent: () =>
      import('../components/header/article-header.component').then((m) => m.ArticleHeaderComponent),

    outlet: 'header',
    pathMatch: 'full',
  },
];
