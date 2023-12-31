import { useQueryClient } from '@tanstack/react-query';
import { ClientInferResponses } from '@ts-rest/core';
import { useCallback, useMemo } from 'react';

import { Article, contract } from '@realworld/dto';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

type ArticleResponse = ClientInferResponses<typeof contract.article.getArticle, 200>;
type ArticlesResponse = ClientInferResponses<typeof contract.article.getArticles, 200>;

export function useToggleFavorite(article?: Article) {
  const queryClient = useQueryClient();

  const onMutate = (favorited: Article['favorited']) => () => {
    queryClient.setQueriesData<ArticleResponse | null>(
      { queryKey: QueryKeyFactory.article.get() },
      (article) =>
        article
          ? {
              ...article,
              body: {
                ...article.body,
                article: {
                  ...article.body.article,
                  favorited,
                  favoritesCount: article!.body.article.favoritesCount + (favorited ? 1 : -1),
                },
              },
            }
          : null
    );
    [QueryKeyFactory.article.getAll(), QueryKeyFactory.feed.getAll()].forEach(
      (queryKey) =>
        new Promise((resolve) =>
          queryClient.setQueriesData<ArticlesResponse | null>({ queryKey }, (articles) =>
            articles
              ? {
                  ...articles,
                  body: {
                    ...articles.body,
                    articles: articles!.body.articles.map((original) =>
                      original.slug === article!.slug
                        ? {
                            ...original,
                            favorited,
                            favoritesCount: original.favoritesCount + (favorited ? 1 : -1),
                          }
                        : original
                    ),
                  },
                }
              : null
          )
        )
    );
  };

  const onSuccess = () => (res: ArticleResponse) => {
    queryClient.setQueriesData({ queryKey: QueryKeyFactory.article.get() }, res);
  };

  const { mutate: like, ...resultLike } = useClient().favorites.setFavorite.useMutation({
    onMutate: onMutate(true),
    onSuccess: onSuccess(),
  });
  const { mutate: unlike, ...resultUnlike } = useClient().favorites.deleteFavorite.useMutation({
    onMutate: onMutate(false),
    onSuccess: onSuccess(),
  });

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
