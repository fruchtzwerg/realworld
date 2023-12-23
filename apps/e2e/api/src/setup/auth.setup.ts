import { expect, test } from '@playwright/test';
import { v4 as uuid } from 'uuid';

import { loadStorage, saveStorage } from '../utils/storage.util';
import { createUser, login } from '../utils/user.util';

test.describe.serial('user', () => {
  test.describe('@POST create user', () => {
    test('OK @201', async ({ request }) => {
      // Given
      const username = `username-${uuid()}`;
      const email = `email-${uuid()}@example.com`;
      const password = `password`;

      // When
      const response = await createUser(request, username, email, password);

      // Then
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toEqual(201);
      const { user } = await response.json();
      expect(user.username).toEqual(username);
      expect(user.email).toEqual(email);
      expect(user.token).toBeDefined();

      // Save user to file
      await saveStorage({ user, password });
    });

    test('KO @422', async ({ request }) => {
      // Given
      const username = `ggn-username-${uuid()}`;
      const email = `ggn-email-${uuid()}@example.com`;
      const password = null;

      // When
      const response = await createUser(request, username, email, password);

      // Then
      expect(response.status()).toEqual(422);
    });
  });

  test.describe('@POST login', () => {
    test('OK @200', async ({ request }) => {
      // Given
      const storage = await loadStorage();

      // When
      const response = await login(request, storage.user.email, storage.password);

      // Then
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toEqual(200);
      const { user } = await response.json();
      expect(user.username).toEqual(storage.user.username);
      expect(user.email).toEqual(storage.user.email);
      expect(user.token).toBeDefined();
    });
  });
});
