import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

const TAGS_QUERY_KEY = QueryKeyFactory.tag.getAll();

export function useTagsGet() {
  const client = useClient();
  const result = useQuery(client.tags.getTags.queryOptions({ queryKey: TAGS_QUERY_KEY }));
  const tags = useMemo(() => result.data?.tags, [result.data?.tags]);

  return { tags, ...result };
}
