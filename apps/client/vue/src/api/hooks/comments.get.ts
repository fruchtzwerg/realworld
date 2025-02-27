import { computed, type Ref } from 'vue';

import { useClient } from '../client';

export const useComments = (slug: Ref<string>) => {
  const client = useClient();

  const { data, ...rest } = client.comments.getComments.useQuery(['comments', slug], () => ({
    params: { slug: slug.value },
  }));

  const comments = computed(() => data.value?.body.comments);

  return { comments, data, ...rest };
};
