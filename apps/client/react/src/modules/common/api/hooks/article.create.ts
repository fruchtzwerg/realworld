import { useQueryClient } from '@tanstack/react-query';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

export function useArticleCreate() {
  const queryClient = useQueryClient();
  return useClient().article.createArticle.useMutation({
    onSuccess: () => {
      [QueryKeyFactory.article.getAll(), QueryKeyFactory.feed.getAll()].forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey: [queryKey] })
      );
    },
  });
}
