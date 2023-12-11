import { createRouter, createWebHistory } from 'vue-router';

import { routes } from './routes.const';

export const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes,
});
