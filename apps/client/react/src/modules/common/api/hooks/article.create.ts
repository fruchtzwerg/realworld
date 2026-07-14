import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

export function useArticleCreate() {
  const client = useClient();
  const queryClient = useQueryClient();
  return useMutation(
    client.article.createArticle.mutationOptions({
      onSuccess: () => {
        [QueryKeyFactory.article.getAll(), QueryKeyFactory.feed.getAll()].forEach((queryKey) =>
          queryClient.invalidateQueries({ queryKey: [queryKey] })
        );
      },
    })
  );
}
