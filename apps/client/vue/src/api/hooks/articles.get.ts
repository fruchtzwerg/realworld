import { computed, type Ref } from 'vue';

import type { ArticlesQuery } from '@realworld/dto';
import { shallowSparse } from '@realworld/utils';

import { useClient } from '../client';

interface ArticleOptions {
  author?: Ref<string | undefined>;
  favorited?: Ref<string | undefined>;
  tag?: Ref<string | undefined>;
  limit?: Ref<number | undefined>;
  offset?: Ref<number | undefined>;
  staleTimeMs?: number;
  enabled?: Ref<boolean>;
}

// const fiveMinutes = 1000 * 60 * 5;

/**
 * Get articles.
 * @param staleTimeMs default: 5 minutes
 */
export const useArticles = (options: ArticleOptions = {}) => {
  const client = useClient();
  const query = computed(() =>
    shallowSparse<ArticlesQuery>({
      limit: options.limit?.value ?? 10,
      offset: options.offset?.value ?? 0,
      author: options.author?.value,
      favorited: options.favorited?.value,
      tag: options.tag?.value,
    })
  );

  const queryKey = ['articles', options.author, options.favorited, options.tag];

  // fetch articles
  const { data, ...rest } = client.article.getArticles.useQuery(
    queryKey,
    () => ({ query: query.value }),
    {
      // TODO: unvalidate other caches after favorite/unfavorite
      // staleTime: options.staleTimeMs ?? fiveMinutes,
      enabled: computed(() => options.enabled?.value ?? true),
    }
  );

  // normalize articles
  const articles = computed(() => data.value?.body.articles);
  const articlesCount = computed(() => data.value?.body.articlesCount);

  return { articles, articlesCount, data, ...rest };
};
