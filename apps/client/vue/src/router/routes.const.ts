import type { RouteRecordRaw } from 'vue-router';

import { satisfies } from '@realworld/utils';

export const routes = satisfies<RouteRecordRaw[]>()([
  {
    path: '/',
    components: {
      default: () => import('../modules/feed/pages/feed.page.vue'),
      header: () => import('../modules/feed/components/header.vue'),
    },
  },
  {
    path: '/login',
    component: () => import('../modules/login/pages/login.page.vue'),
  },
  {
    path: '/register',
    component: () => import('../modules/signup/pages/signup.page.vue'),
  },
  {
    path: '/editor',
    component: () => import('../modules/article/pages/create-article.page.vue'),
  },
  {
    path: '/settings',
    component: () => import('../modules/user/pages/settings.page.vue'),
  },
  {
    path: '/profile/:username',
    components: {
      default: () => import('../modules/feed/pages/feed.page.vue'),
      header: () => import('../modules/user/components/header.vue'),
    },
    props: {
      default: (route) => ({
        isPrivate: true,
        username: route.params.username,
      }),
      header: (route) => ({
        username: route.params.username,
      }),
    },
  },
  {
    path: '/article/:slug',
    components: {
      default: () => import('../modules/article/pages/article.page.vue'),
      header: () => import('../modules/article/components/header.vue'),
    },
    props: { default: true, header: true },
  },
] as const);

export type RoutePath = MapRouteParam<(typeof routes)[number]['path']>;

// FIXME: only works for two params deep; ignores static paths after first param
type MapRouteParam<
  T extends string,
  P extends string | null = null
> = T extends `${infer Param}:${infer Rest}`
  ? P extends null
    ? `${Param}${string}${Rest extends `${string}:${string}`
        ? `/${MapRouteParam<Rest, string>}`
        : ''}`
    : `${string}${Rest extends `${string}:${string}`
        ? MapRouteParam<Rest, string>
        : string}`
  : T;
