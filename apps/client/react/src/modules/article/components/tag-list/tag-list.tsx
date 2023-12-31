import classNames from 'classnames';
import { HTMLProps } from 'react';
import { Link } from 'react-router-dom';

import { useTagsGet } from '../../../common/api/hooks/tags.get';

/* eslint-disable-next-line */
export interface TagListProps extends HTMLProps<HTMLElement> {}

export function TagList({ className, ...props }: TagListProps) {
  const { tags, isLoading } = useTagsGet();
  return isLoading ? (
    <div className={classNames([className, 'w-64 p-3 min-w-[16rem] skeleton h-52'])}></div>
  ) : (
    <div
      className={classNames([
        className,
        'w-64 h-fit p-3 pt-2 min-w-[16rem] bg-neutral text-neutral-content rounded-box',
      ])}
    >
      <p className="mb-1">Popular Tags</p>
      <ol className="flex flex-wrap gap-1">
        {tags?.map((tag) => (
          <li v-for="tag in tags?.body.tags" key={tag}>
            <Link to={`/articles/${tag}`} className="badge">
              {tag}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TagList;
