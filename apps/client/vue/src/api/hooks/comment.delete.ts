import { useMutation, useQueryClient } from '@tanstack/vue-query';
import type { MaybeRef } from 'vue';

import type { Article } from '@realworld/dto';

import { useApi } from '../client';

export const useDeleteComment = (slug: MaybeRef<Article['slug']>) => {
  const client = useApi();
  const queryClient = useQueryClient();

  return useMutation(
    client.comments.deleteComment.mutationOptions({
      onSuccess: () => queryClient.refetchQueries({ queryKey: ['comments', slug] }),
    })
  );
};
