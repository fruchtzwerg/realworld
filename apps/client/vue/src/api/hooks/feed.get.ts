import { computed, unref, type MaybeRef } from 'vue';

import { useApi } from '../client';
import { useQuery } from '@tanstack/vue-query';

export interface FeedOptions {
  limit?: MaybeRef<number | undefined>;
  offset?: MaybeRef<number | undefined>;
  enabled?: MaybeRef<boolean>;
}

export const useFeed = (options: FeedOptions) => {
  const client = useApi();
  const query = computed(() => ({
    limit: unref(options.limit) ?? 10,
    offset: unref(options.offset) ?? 0,
  }));

  // fetch feed
  const { data, ...rest } = useQuery(
    computed(() =>
      client.article.getFeed.queryOptions({
        queryKey: ['feed', unref(options.limit), unref(options.offset)],
        input: { query: query.value },
        enabled: unref(options.enabled),
      })
    )
  );

  // normalize articles
  const articles = computed(() => data.value?.articles);
  const articlesCount = computed(() => data.value?.articlesCount);

  return { articles, articlesCount, data, ...rest };
};
