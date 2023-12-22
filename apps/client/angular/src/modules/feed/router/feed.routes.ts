import { Routes } from '@angular/router';

import { FeedComponent } from '../components/feed/feed.component';
import { articlesResolver } from '../resolvers/articles.resolver';
import { feedResolver } from '../resolvers/feed.resolver';
import { tabsResolver } from '../resolvers/tabs.resolver';

export const feedRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('../pages/feed/feed.page').then((m) => m.FeedPage),
    outlet: 'primary',
    children: [
      {
        path: '',
        component: FeedComponent,
        resolve: { articles: articlesResolver, tabs: tabsResolver },
      },
      {
        path: 'feed',
        component: FeedComponent,
        resolve: { articles: feedResolver, tabs: tabsResolver },
      },
      {
        path: ':tag',
        component: FeedComponent,
        resolve: { articles: articlesResolver, tabs: tabsResolver },
      },
    ],
  },
];
