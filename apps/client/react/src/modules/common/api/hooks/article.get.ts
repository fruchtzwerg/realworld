import { useMemo } from 'react';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

export function useArticleGet(slug?: string) {
  const queryKey = QueryKeyFactory.article.get({ slug });
  const result = useClient().article.getArticle.useQuery(
    queryKey,
    { params: { slug: slug! } },
    { queryKey, enabled: !!slug }
  );

  const article = useMemo(() => result.data?.body.article, [result.data?.body.article]);

  return { article, ...result };
}

export default useArticleGet;
