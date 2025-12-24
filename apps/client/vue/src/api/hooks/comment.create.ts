import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { computed, unref, type MaybeRef } from 'vue';

import type { Article } from '@realworld/dto';

import { useApi } from '../client';

export const useCreateComment = (slug: MaybeRef<Article['slug']>) => {
  const client = useApi();
  const queryClient = useQueryClient();

  const { data, ...rest } = useMutation(
    client.comments.createComment.mutationOptions({
      onSuccess: () => queryClient.refetchQueries({ queryKey: ['comments', unref(slug)] }),
    })
  );

  const comment = computed(() => data.value?.comment);

  return { comment, data, ...rest };
};
