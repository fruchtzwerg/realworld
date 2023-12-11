import { useQueryClient } from '@tanstack/vue-query';
import type { ClientInferResponses } from '@ts-rest/core';
import { computed, type Ref } from 'vue';

import type { Article, contract } from '@realworld/dto';

import { useClient } from '../client';

type ArticlesResponse = ClientInferResponses<
  typeof contract.article.getArticles | typeof contract.article.getFeed,
  200
>;
type ArticleResponse = ClientInferResponses<
  typeof contract.article.getArticle,
  200
>;

const insertArticle = (articles: Article[], article: Article) => {
  const index = articles.findIndex((a) => a.slug === article.slug);

  return [
    ...articles.slice(0, index),
    article,
    ...articles.slice(index + 1),
  ] as Article[];
};

const updateArticle = (article: Article) => ({
  ...article,
  favorited: !article.favorited,
  favoritesCount: article.favoritesCount + (article.favorited ? -1 : 1),
});

const useSetQueriesData = () => {
  const queryClient = useQueryClient();

  return (article: Article) => {
    ['articles', 'feed'].forEach((queryKey) =>
      queryClient.setQueriesData<ArticlesResponse>(
        { queryKey: [queryKey] },
        (res) =>
          res
            ? {
                ...res,
                body: {
                  articles: insertArticle(
                    res.body.articles,
                    updateArticle(article)
                  ),
                  articlesCount: res.body.articlesCount,
                },
              }
            : res
      )
    );
    queryClient.setQueriesData<ArticleResponse>(
      { queryKey: ['article'] },
      (res) =>
        res
          ? {
              ...res,
              body: {
                article: updateArticle(res.body.article),
              },
            }
          : res
    );
  };
};

/** Toggle favorited state of an article. Update cache based on queryKey. */
export const useToggleFavorite = (article: Ref<Article | undefined>) => {
  if (!article.value)
    return { mutate: () => {}, isPending: computed(() => false) };

  const client = useClient();
  const queryClient = useQueryClient();
  const setQueriesData = useSetQueriesData();
  const invalidateQueries = () =>
    ['article', 'articles', 'feed'].forEach((queryKey) =>
      queryClient.invalidateQueries({ queryKey: [queryKey] })
    );

  // queries
  const { mutate: set_mutate, isPending: set_isPending } =
    client.favorites.setFavorite.useMutation({
      onSuccess: invalidateQueries,
    });
  const { mutate: unset_mutate, isPending: unset_isPending } =
    client.favorites.deleteFavorite.useMutation({
      onSuccess: invalidateQueries,
    });

  // mutation function
  const mutate = () => {
    const fn = article.value!.favorited ? unset_mutate : set_mutate;

    // optimistic update
    setQueriesData(article.value!);

    return fn({ params: { slug: article.value!.slug } });
  };

  const isPending = computed(() =>
    article.value!.favorited ? set_isPending.value : unset_isPending.value
  );

  return { mutate, isPending };
};
