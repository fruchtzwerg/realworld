import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { Article } from '@realworld/dto';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

export function useCommentsGet(slug?: Article['slug']) {
  const client = useClient();
  const queryKey = QueryKeyFactory.comment.getAll(slug);
  const result = useQuery(
    client.comments.getComments.queryOptions({
      queryKey,
      input: { params: { slug: slug! } },
      enabled: !!slug,
    })
  );

  const comments = useMemo(() => result.data?.comments, [result.data?.comments]);

  return { comments, ...result };
}

export default useCommentsGet;
