import { expect } from '@playwright/test';

import { test } from './utils/account.fixture';
import { createPost } from './utils/article.util';

test.describe.serial('profile', () => {
  test.describe('@GET profile', () => {
    test('OK @200', async ({ request, account }) => {
      // When
      const response = await request.get(`/api/profiles/${account.username}`);

      // Then
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toEqual(200);
      const { profile } = await response.json();
      expect(profile.image).toBeFalsy();
    });
  });

  test.describe('@POST follow user', () => {
    test('OK @200', async ({ request, account }) => {
      // Given
      await createPost(request, account.token);

      // When
      const followUserResponse = await request.post(`/api/profiles/${account.username}/follow`, {
        headers: {
          Authorization: `Token ${account.token}`,
        },
      });

      const getFeedResponse = await request.get('/api/articles/feed', {
        headers: {
          Authorization: `Token ${account.token}`,
        },
      });

      // Then
      expect(followUserResponse.ok()).toBeTruthy();
      const { profile } = await followUserResponse.json();
      expect(profile.following).toBeTruthy();

      expect(getFeedResponse.ok()).toBeTruthy();
      const { articles } = await getFeedResponse.json();
      expect(articles.length).toBeGreaterThan(0);
    });
  });

  test.describe('@DELETE unfollow user', () => {
    test('OK @200', async ({ request, account }) => {
      // Given
      await request.post(`/api/profiles/${account.username}/follow`, {
        headers: {
          Authorization: `Token ${account.token}`,
        },
      });

      // When
      const unfollowUserResponse = await request.delete(
        `/api/profiles/${account.username}/follow`,
        {
          headers: {
            Authorization: `Token ${account.token}`,
          },
        }
      );
      const { profile } = await unfollowUserResponse.json();

      // Then
      expect(unfollowUserResponse.ok()).toBeTruthy();
      expect(profile.following).toEqual(false);
    });
  });
});
