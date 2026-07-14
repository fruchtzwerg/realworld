import type { InferContractRouterOutputs } from '@orpc/contract';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { Article, contract } from '@realworld/dto';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

type ArticleOutputs = InferContractRouterOutputs<typeof contract.article>;
type ArticleResponse = ArticleOutputs['getArticle'];
type ArticlesResponse = ArticleOutputs['getArticles'];

export function useToggleFavorite(article?: Article) {
  const client = useClient();
  const queryClient = useQueryClient();

  const onMutate = (favorited: Article['favorited']) => () => {
    queryClient.setQueriesData<ArticleResponse | null>(
      { queryKey: QueryKeyFactory.article.get() },
      (res) =>
        res
          ? {
              ...res,
              article: {
                ...res.article,
                favorited,
                favoritesCount: res.article.favoritesCount + (favorited ? 1 : -1),
              },
            }
          : null
    );
    [QueryKeyFactory.article.getAll(), QueryKeyFactory.feed.getAll()].forEach((queryKey) =>
      queryClient.setQueriesData<ArticlesResponse | null>({ queryKey }, (res) =>
        res
          ? {
              ...res,
              articles: res.articles.map((original) =>
                original.slug === article!.slug
                  ? {
                      ...original,
                      favorited,
                      favoritesCount: original.favoritesCount + (favorited ? 1 : -1),
                    }
                  : original
              ),
            }
          : null
      )
    );
  };

  const onSuccess = () => () => {
    [QueryKeyFactory.article.get(), QueryKeyFactory.article.getAll(), QueryKeyFactory.feed.getAll()].forEach(
      (queryKey) => queryClient.invalidateQueries({ queryKey })
    );
  };

  const { mutate: like, ...resultLike } = useMutation(
    client.favorites.setFavorite.mutationOptions({
      onMutate: onMutate(true),
      onSuccess: onSuccess(),
    })
  );
  const { mutate: unlike, ...resultUnlike } = useMutation(
    client.favorites.deleteFavorite.mutationOptions({
      onMutate: onMutate(false),
      onSuccess: onSuccess(),
    })
  );

  const toggleLike = useCallback(() => {
    if (!article) return;

    const fn = article.favorited ? unlike : like;
    fn({ params: { slug: article.slug } });
  }, [article, like, unlike]);

  const result = useMemo(
    () => (article?.favorited ? resultUnlike : resultLike),
    [article?.favorited, resultLike, resultUnlike]
  );

  return { toggleLike, ...result };
}

export default useToggleFavorite;
