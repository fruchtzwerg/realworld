/* eslint-disable no-empty-pattern */
import { test as base } from '@playwright/test';

import { User } from '@realworld/dto';

import { loadStorage } from './storage.util';

interface ApiFixtures {
  token: string;
  account: User;
}

export const test = base.extend<ApiFixtures>({
  token: async ({}, use) => {
    const { user } = await loadStorage();
    await use(user.token);
  },
  account: async ({}, use) => {
    const { user } = await loadStorage();
    await use(user);
  },
});
