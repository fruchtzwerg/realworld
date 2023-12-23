import { APIRequestContext } from '@playwright/test';
import { v4 as uuid } from 'uuid';

export const createPost = async (request: APIRequestContext, token) => {
  return request.post('/api/articles', {
    headers: {
      Authorization: `Token ${token}`,
    },
    data: {
      article: {
        title: `ggn-title-${uuid()}`,
        description: 'bar',
        body: 'bar',
        tagList: ['foo'],
      },
    },
  });
};
