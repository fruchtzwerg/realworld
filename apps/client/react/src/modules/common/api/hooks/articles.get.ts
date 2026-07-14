import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { ArticlesQuery, FeedQuery } from '@realworld/dto';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

export function useArticlesGet(type: 'feed' | 'articles', filter: ArticlesQuery | FeedQuery = {}) {
  const client = useClient();
  const query = { limit: 10, ...filter };

  const articlesQueryKey = QueryKeyFactory.article.getAll(query);
  const feedQueryKey = QueryKeyFactory.feed.getAll(query);

  const resultArticles = useQuery(
    client.article.getArticles.queryOptions({
      queryKey: articlesQueryKey,
      input: { query },
      enabled: type === 'articles',
    })
  );

  const resultFeed = useQuery(
    client.article.getFeed.queryOptions({
      queryKey: feedQueryKey,
      input: { query },
      enabled: type === 'feed',
    })
  );

  const result = useMemo(
    () => (type === 'feed' ? resultFeed : resultArticles),
    [type, resultArticles, resultFeed]
  );
  const articles = useMemo(() => result.data?.articles, [result]);

  return { articles, ...result };
}
