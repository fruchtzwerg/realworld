import { Routes } from '@angular/router';

import { authorizedGuard } from '../../auth/guards/authorized.guard';
import { FeedComponent } from '../../feed/components/feed/feed.component';
import { authoredArticlesResolver } from '../resolvers/authored-articles.resolver';
import { favoriteArticlesResolver } from '../resolvers/favorite-articles.resolver';
import { tabsResolver } from '../resolvers/tabs.resolver';

export const userRoutes: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('../pages/profile/profile.page').then((m) => m.ProfilePage),
    children: [
      {
        path: ':username',
        component: FeedComponent,
        resolve: { tabs: tabsResolver, articles: authoredArticlesResolver },
      },
      {
        path: ':username/favorites',
        component: FeedComponent,
        resolve: { tabs: tabsResolver, articles: favoriteArticlesResolver },
      },
    ],
  },
  {
    path: 'settings',
    loadComponent: () => import('../pages/settings/settings.page').then((m) => m.SettingsPage),
    canActivate: [authorizedGuard],
  },
];
