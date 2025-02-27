import { computed, type Ref } from 'vue';

import { useClient } from '../client';

export const useArticle = (slug: Ref<string>) => {
  const client = useClient();

  const { data, ...rest } = client.article.getArticle.useQuery(['article', slug], () => ({
    params: { slug: slug.value },
  }));

  const article = computed(() => data.value?.body.article);

  return { article, data, ...rest };
};
