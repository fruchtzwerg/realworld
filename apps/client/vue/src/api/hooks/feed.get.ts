import { computed, type Ref } from 'vue';

import { useClient } from '../client';

export interface FeedOptions {
  limit?: Ref<number | undefined>;
  offset?: Ref<number | undefined>;
  enabled?: Ref<boolean>;
}

export const useFeed = (options: FeedOptions) => {
  const client = useClient();
  const query = computed(() => ({
    limit: options.limit?.value ?? 10,
    offset: options.offset?.value ?? 0,
  }));

  const queryKey = ['feed', options.limit, options.offset];

  // fetch feed
  const { data, ...rest } = client.article.getFeed.useQuery(
    queryKey,
    () => ({ query: query.value }),
    { enabled: options.enabled }
  );

  // normalize articles
  const articles = computed(() => data.value?.body.articles);
  const articlesCount = computed(() => data.value?.body.articlesCount);

  return { articles, articlesCount, data, ...rest };
};
