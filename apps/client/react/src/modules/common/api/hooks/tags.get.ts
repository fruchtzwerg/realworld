import { useMemo } from 'react';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

const TAGS_QUERY_KEY = QueryKeyFactory.tag.getAll();

export function useTagsGet() {
  const result = useClient().tags.getTags.useQuery(TAGS_QUERY_KEY);
  const tags = useMemo(() => result.data?.body.tags, [result.data?.body.tags]);

  return { tags, ...result };
}
