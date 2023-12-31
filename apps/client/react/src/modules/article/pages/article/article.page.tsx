import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { useParams } from 'react-router-dom';

import { getRandomWidth } from '@realworld/utils';

import { PageProps, useHeader } from '../../../../app/app.context';
import useArticleGet from '../../../common/api/hooks/article.get';
import Impression from '../../../common/components/impression/impression';
import CommentCreator from '../../components/comment-creator/comment-creator';
import CommentList from '../../components/comment-list/comment-list';

export interface ArticlePageProps extends PageProps, HTMLAttributes<HTMLDivElement> {}

export function ArticlePage({ className, header }: ArticlePageProps) {
  const { slug } = useParams();
  const { article, isSuccess } = useArticleGet(slug);

  useHeader(header);

  return isSuccess ? (
    <div className={classNames(['px-4 pb-8 space-y-6', className])}>
      <p className="font-serif text-xl">{article?.body}</p>

      <ul className="flex space-x-1">
        {article?.tagList.map((tag) => (
          <li key={tag} className="badge badge-outline text-base-content/60">
            {tag}
          </li>
        ))}
      </ul>

      <div className="divider" />

      <Impression article={article!} className="mx-auto w-fit" />

      <div className="max-w-2xl mx-auto space-y-4">
        <CommentCreator slug={slug} />

        <CommentList slug={slug} />
      </div>
    </div>
  ) : (
    <div className={classNames(['space-y-2', className])}>
      {Array.from({ length: 24 }).map((_, index) => (
        <div className="h-4 skeleton" style={{ width: getRandomWidth() }} key={index} />
      ))}
    </div>
  );
}

export default ArticlePage;
