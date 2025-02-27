import { useQueryClient } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';

import type { Article } from '@realworld/dto';

import { useClient } from '../client';

export const useCreateComment = (slug: Ref<Article['slug']>) => {
  const client = useClient();
  const queryClient = useQueryClient();

  const { data, ...rest } = client.comments.createComment.useMutation({
    onSuccess: () => queryClient.refetchQueries({ queryKey: ['comments', slug] }),
  });

  const comment = computed(() => data.value?.body.comment);

  return { comment, data, ...rest };
};
