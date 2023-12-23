import { expect, test } from '@playwright/test';

import { loadStorage } from '../utils/storage.util';
import { deleteAllUsers, deleteUser } from '../utils/user.util';

test.describe('@POST delete user', () => {
  test.afterAll(async ({ request }) => {
    await deleteAllUsers(request);
  });

  test('OK @200', async ({ request }) => {
    // Given
    // const username = `ggn-username-${uuid()}`;
    const { user } = await loadStorage();

    // When
    const response = await deleteUser(request, user.username);

    // Then
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toEqual(200);
    const { user: deletedUser } = await response.json();

    expect(deletedUser.username).toEqual(user.username);
    expect(deletedUser.email).toEqual(user.email);
    expect(deletedUser.token).not.toBeDefined();
  });
});
