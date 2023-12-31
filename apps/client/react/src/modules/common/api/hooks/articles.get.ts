import { useMemo } from 'react';

import { ArticlesQuery, FeedQuery } from '@realworld/dto';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

export function useArticlesGet(type: 'feed' | 'articles', filter: ArticlesQuery | FeedQuery = {}) {
  const query = { limit: 10, ...filter };

  const articlesQueryKey = QueryKeyFactory.article.getAll(query);
  const feedQueryKey = QueryKeyFactory.feed.getAll(query);

  const resultArticles = useClient().article.getArticles.useQuery(
    articlesQueryKey,
    { query },
    { queryKey: articlesQueryKey, enabled: type === 'articles' }
  );

  const resultFeed = useClient().article.getFeed.useQuery(
    feedQueryKey,
    { query },
    { queryKey: feedQueryKey, enabled: type === 'feed' }
  );

  const result = useMemo(
    () => (type === 'feed' ? resultFeed : resultArticles),
    [type, resultArticles, resultFeed]
  );
  const articles = useMemo(() => result.data?.body.articles, [result]);

  return { articles, ...result };
}
