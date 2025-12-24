import { computed, unref, type MaybeRef } from 'vue';

import type { ArticlesQuery } from '@realworld/dto';
import { shallowSparse } from '@realworld/utils';

import { useApi } from '../client';
import { useQuery } from '@tanstack/vue-query';

interface ArticleOptions {
  author?: MaybeRef<string | undefined>;
  favorited?: MaybeRef<string | undefined>;
  tag?: MaybeRef<string | undefined>;
  limit?: MaybeRef<number | undefined>;
  offset?: MaybeRef<number | undefined>;
  staleTimeMs?: number;
  enabled?: MaybeRef<boolean>;
}

// const fiveMinutes = 1000 * 60 * 5;

/**
 * Get articles.
 * @param staleTimeMs default: 5 minutes
 */
export const useArticles = (options: ArticleOptions = {}) => {
  const client = useApi();
  const query = computed(() =>
    shallowSparse<ArticlesQuery>({
      limit: unref(options.limit) ?? 10,
      offset: unref(options.offset) ?? 0,
      author: unref(options.author),
      favorited: unref(options.favorited),
      tag: unref(options.tag),
    })
  );

  // fetch articles
  const { data, ...rest } = useQuery(
    computed(() =>
      client.article.getArticles.queryOptions({
        queryKey: ['articles', unref(options.author), unref(options.favorited), unref(options.tag)],
        input: { query: query.value },
        // TODO: unvalidate other caches after favorite/unfavorite
        // staleTime: options.staleTimeMs ?? fiveMinutes,
        enabled: unref(options.enabled) ?? true,
      })
    )
  );

  // normalize articles
  const articles = computed(() => data.value?.articles);
  const articlesCount = computed(() => data.value?.articlesCount);

  return { articles, articlesCount, data, ...rest };
};
