import { computed, unref, type MaybeRef } from 'vue';

import { useApi } from '../client';
import { useQuery } from '@tanstack/vue-query';

export const useArticle = (slug: MaybeRef<string>) => {
  const client = useApi();

  const { data, ...rest } = useQuery(
    computed(() =>
      client.article.getArticle.queryOptions({
        queryKey: ['article', unref(slug)],
        input: { params: { slug: unref(slug) } },
      })
    )
  );

  const article = computed(() => data.value?.article);

  return { article, data, ...rest };
};
