import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { computed, unref, type MaybeRef } from 'vue';

import type { Article, contract } from '@realworld/dto';

import { useApi } from '../client';
import type { InferContractRouterOutputs } from '@orpc/contract';

type ArticleResponses = InferContractRouterOutputs<typeof contract.article>;
type ArticlesResponse = ArticleResponses['getArticles'];
type ArticleResponse = ArticleResponses['getArticle'];

const insertArticle = (articles: Article[], article: Article) => {
  const index = articles.findIndex((a) => a.slug === article.slug);

  return [...articles.slice(0, index), article, ...articles.slice(index + 1)] as Article[];
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
      queryClient.setQueriesData<ArticlesResponse>({ queryKey: [queryKey] }, (res) =>
        res
          ? {
              ...res,
              body: {
                articles: insertArticle(res.articles, updateArticle(article)),
                articlesCount: res.articlesCount,
              },
            }
          : res
      )
    );
    queryClient.setQueriesData<ArticleResponse>({ queryKey: ['article'] }, (res) =>
      res
        ? {
            ...res,
            body: {
              article: updateArticle(res.article),
            },
          }
        : res
    );
  };
};

/** Toggle favorited state of an article. Update cache based on queryKey. */
export const useToggleFavorite = (article: MaybeRef<Article | undefined>) => {
  if (!unref(article)) return { mutate: () => {}, isPending: computed(() => false) };

  const client = useApi();
  const queryClient = useQueryClient();
  const setQueriesData = useSetQueriesData();
  const invalidateQueries = () =>
    ['article', 'articles', 'feed'].forEach((queryKey) =>
      queryClient.invalidateQueries({ queryKey: [queryKey] })
    );

  // queries
  const { mutate: set_mutate, isPending: set_isPending } = useMutation(
    client.favorites.setFavorite.mutationOptions({
      onSuccess: invalidateQueries,
    })
  );
  const { mutate: unset_mutate, isPending: unset_isPending } = useMutation(
    client.favorites.deleteFavorite.mutationOptions({
      onSuccess: invalidateQueries,
    })
  );

  // mutation function
  const mutate = () => {
    const fn = unref(article)!.favorited ? unset_mutate : set_mutate;

    // optimistic update
    setQueriesData(unref(article)!);

    return fn({ params: { slug: unref(article)!.slug } });
  };

  const isPending = computed(() =>
    unref(article)!.favorited ? set_isPending.value : unset_isPending.value
  );

  return { mutate, isPending };
};
