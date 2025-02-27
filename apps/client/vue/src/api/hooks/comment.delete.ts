import { useQueryClient } from '@tanstack/vue-query';
import type { Ref } from 'vue';

import type { Article } from '@realworld/dto';

import { useClient } from '../client';

export const useDeleteComment = (slug: Ref<Article['slug']>) => {
  const client = useClient();
  const queryClient = useQueryClient();

  return client.comments.deleteComment.useMutation({
    onSuccess: () => queryClient.refetchQueries({ queryKey: ['comments', slug] }),
  });
};
