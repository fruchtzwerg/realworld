import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import { Article, Profile } from '@realworld/dto';
import { formatter } from '@realworld/utils';

import Avatar from '../avatar/avatar';

export interface AuthorProps extends HTMLAttributes<HTMLDivElement> {
  author?: Profile;
  createdAt?: Article['createdAt'];
}

export function Author({ author, createdAt, className }: AuthorProps) {
  return author && createdAt ? (
    <div
      className={classNames([
        'grid grid-areas-[avatar_name,avatar_created] grid-cols-[auto,1fr] gap-x-2 items-center w-fit',
        className,
      ])}
    >
      <Avatar user={author} size="md" className="grid-in-[avatar]" />

      <Link
        to={`/profile/${author.username}`}
        className="grid-in-[name] hover:link text-primary link-primary w-fit"
      >
        {author.username}
      </Link>

      <span className="grid-in-[created] text-xs text-base-300 dark:text-base-content/50">
        {formatter.format(new Date(createdAt))}
      </span>
    </div>
  ) : (
    <div className={classNames(['flex items-center gap-4', className])}>
      <Avatar size="md" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-14 skeleton"></div>
        <div className="w-24 h-3 skeleton"></div>
      </div>
    </div>
  );
}

export default Author;
