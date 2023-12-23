import { expect } from '@playwright/test';
import { v4 as uuid } from 'uuid';

import { test } from './utils/account.fixture';

test('should retrieve articles', async ({ request }) => {
  const response = await request.get('/api/articles');
  expect(response.ok()).toBeTruthy();

  const { articles } = await response.json();
  expect(articles.length).toBeGreaterThanOrEqual(0);
});

test('CRUD article', async ({ request, token }) => {
  const title = `ggn-title-${uuid()}`;
  const articleCreationResponse = await request.post('/api/articles', {
    headers: {
      Authorization: `Token ${token}`,
    },
    data: {
      article: {
        title,
        description: 'bar',
        body: 'bar',
        tagList: ['foo'],
      },
    },
  });

  const { article } = await articleCreationResponse.json();

  const getArticleResponse = await request.get(`/api/articles/${article.slug}`);
  expect(getArticleResponse.ok()).toBeTruthy();

  const updateArticleResponse = await request.put(`/api/articles/${article.slug}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
    data: {
      article: {
        tagList: ['bar'],
      },
    },
  });

  expect(updateArticleResponse.ok()).toBeTruthy();
  const { article: updatedArticle } = await updateArticleResponse.json();
  expect(updatedArticle.tagList).toEqual(['bar']);

  const deleteArticleResponse = await request.delete(`/api/articles/${article.slug}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  expect(deleteArticleResponse.ok()).toBeTruthy();

  const getDeletedArticleResponse = await request.get(`/api/articles/${article.slug}`);
  expect(getDeletedArticleResponse.ok()).toBeFalsy();
  expect(getDeletedArticleResponse.status()).toEqual(422);
});
