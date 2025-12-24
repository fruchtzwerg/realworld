import { computed, unref, type MaybeRef } from 'vue';

import { useApi } from '../client';
import { useQuery } from '@tanstack/vue-query';

export const useComments = (slug: MaybeRef<string>) => {
  const client = useApi();

  const { data, ...rest } = useQuery(
    computed(() => {
      const _slug = unref(slug);

      return client.comments.getComments.queryOptions({
        queryKey: ['comments', _slug],
        input: { params: { slug: _slug } },
      });
    })
  );

  const comments = computed(() => data.value?.comments);

  return { comments, data, ...rest };
};
