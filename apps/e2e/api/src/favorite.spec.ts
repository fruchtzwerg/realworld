import { expect } from '@playwright/test';

import { test } from './utils/account.fixture';
import { createPost } from './utils/article.util';

test.describe.serial('favorites', () => {
  test.describe('@POST favorite article', () => {
    test('OK @200', async ({ request, token }) => {
      // Given
      const articleCreation = await createPost(request, token);
      const { article } = await articleCreation.json();

      // When
      await request.post(`/api/articles/${article.slug}/favorite`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const articleResponse = await request.get(`/api/articles/${article.slug}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const { article: favoriteArticle } = await articleResponse.json();

      // Then
      expect(favoriteArticle.favorited).toBeTruthy();
    });
  });

  test.describe('@DELETE unfavorite article', () => {
    test('OK @200', async ({ request, token }) => {
      // Given
      const articleCreation = await createPost(request, token);
      const { article } = await articleCreation.json();

      // When
      await request.post(`/api/articles/${article.slug}/favorite`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const articleResponse = await request.get(`/api/articles/${article.slug}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const { article: favoriteArticle } = await articleResponse.json();

      // Then
      expect(favoriteArticle.favorited).toBeTruthy();
    });
  });
});
