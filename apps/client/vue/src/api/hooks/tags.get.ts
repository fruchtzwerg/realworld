import { computed } from 'vue';

import { useApi } from '../client';
import { useQuery } from '@tanstack/vue-query';

export const useTags = () => {
  const client = useApi();

  const { data, ...rest } = useQuery(
    computed(() =>
      client.tags.getTags.queryOptions({
        queryKey: ['tags'],
      })
    )
  );

  const tags = computed(() => data.value?.tags);

  return { tags, data, ...rest };
};
