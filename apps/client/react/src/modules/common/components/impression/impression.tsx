import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import IconHeart from 'virtual:icons/ion/heart';

import { Article } from '@realworld/dto';

import { useUserGet } from '../../api/hooks/user.get';
import Author from '../author/author';
import Follow from '../follow/follow';
import Like from '../like/like';

export interface ImpressionProps extends HTMLAttributes<HTMLElement> {
  article?: Article;
}

export function Impression({ className, article }: ImpressionProps) {
  const wrapperClass = 'flex space-x-6';
  const { isSuccess } = useUserGet();

  return article ? (
    <div className={classNames([wrapperClass, className])}>
      <Author author={article.author} createdAt={article.createdAt} />

      <div className="flex items-center space-x-2">
        <Follow username={article.author.username} />

        <Like article={article} className="!btn-sm">
          <IconHeart />
          {isSuccess && <span>Favorite Article</span>}
          <span> {article.favoritesCount}</span>
        </Like>
      </div>
    </div>
  ) : (
    <div className={classNames([wrapperClass, className])}>
      <Author />
      <div className="h-8 w-36 skeleton" />
      <div className="h-8 w-36 skeleton" />
    </div>
  );
}

export default Impression;
