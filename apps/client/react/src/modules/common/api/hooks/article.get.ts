import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

export function useArticleGet(slug?: string) {
  const client = useClient();
  const queryKey = QueryKeyFactory.article.get({ slug });
  const result = useQuery(
    client.article.getArticle.queryOptions({
      queryKey,
      input: { params: { slug: slug! } },
      enabled: !!slug,
    })
  );

  const article = useMemo(() => result.data?.article, [result.data?.article]);

  return { article, ...result };
}

export default useArticleGet;
