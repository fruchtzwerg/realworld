import { Article } from '@realworld/dto';

import ArticleItem from '../article-item/article-item';

/* eslint-disable-next-line */
export interface ArticleListProps {
  isPending: boolean;
  isSuccess: boolean;
  articles?: Article[];
}

export function ArticleList({ isPending, isSuccess, articles }: ArticleListProps) {
  return (
    <ol className="w-full">
      {isPending ? (
        Array.from({ length: 3 }).map((_, index) => <ArticleItem as="li" key={index} />)
      ) : isSuccess && articles?.length ? (
        articles.map((article) => <ArticleItem as="li" article={article} key={article.slug} />)
      ) : (
        <div className="flex items-center justify-center h-32">No articles are here... yet.</div>
      )}
    </ol>
  );
}

export default ArticleList;
