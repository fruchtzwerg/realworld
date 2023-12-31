import { useMemo } from 'react';

import { Article } from '@realworld/dto';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

export function useCommentsGet(slug?: Article['slug']) {
  const queryKey = QueryKeyFactory.comment.getAll(slug);
  const result = useClient().comments.getComments.useQuery(
    queryKey,
    { params: { slug: slug! } },
    { queryKey, enabled: !!slug }
  );

  const comments = useMemo(() => result.data?.body.comments, [result.data?.body.comments]);

  return { comments, ...result };
}

export default useCommentsGet;
