import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import IconHeart from 'virtual:icons/ion/heart';

import { Article } from '@realworld/dto';

import useToggleFavorite from '../../api/hooks/toggle-favorite';
import { useUserGet } from '../../api/hooks/user.get';

export interface LikeProps extends HTMLAttributes<HTMLButtonElement> {
  article?: Article;
}

export function Like({ article, className }: LikeProps) {
  const { user } = useUserGet();
  const { toggleLike } = useToggleFavorite(article);

  return article ? (
    <button
      className={classNames([
        'btn btn-xs btn-outline btn-primary min-w-[4rem]',
        { 'disabled:btn-primary': !user },
        { 'btn-active active': article.favorited },
        className,
      ])}
      disabled={!user}
      onClick={toggleLike}
    >
      <IconHeart />
      <span>{article.favoritesCount}</span>
    </button>
  ) : (
    <div className="w-10 h-4 skeleton" />
  );
}

export default Like;
