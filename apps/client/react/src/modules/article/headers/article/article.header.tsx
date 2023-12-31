import { useParams } from 'react-router-dom';

import useArticleGet from '../../../common/api/hooks/article.get';
import Impression from '../../../common/components/impression/impression';

/* eslint-disable-next-line */
export interface ArticleHeaderProps {}

export function ArticleHeader(props: ArticleHeaderProps) {
  const { slug } = useParams();
  const { article } = useArticleGet(slug);

  const wrapperClass = 'max-w-6xl px-4 mx-auto space-y-8';

  return (
    <div className="p-8 mb-8 bg-neutral text-neutral-content">
      {article ? (
        <div className={wrapperClass}>
          <h1 className="text-5xl font-semibold">{article?.title}</h1>
          <Impression article={article} />
        </div>
      ) : (
        <div className={wrapperClass}>
          <div className="h-12 w-96 skeleton" />
          <Impression />
        </div>
      )}
    </div>
  );
}

export default ArticleHeader;
