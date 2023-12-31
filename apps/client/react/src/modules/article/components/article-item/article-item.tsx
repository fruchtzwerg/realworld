import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { Article } from '@realworld/dto';

import Author from '../../../common/components/author/author';
import Like from '../../../common/components/like/like';

export interface ArticleItemProps {
  as: keyof HTMLElementTagNameMap;
  article?: Article;
}

export function ArticleItem({ as: Component, article, ...rest }: ArticleItemProps) {
  const wrapperClass = 'py-6 border-t border-t-neutral';

  return article ? (
    <Component
      className={classNames([
        wrapperClass,
        'grid grid-areas-[author_likes,article_article] grid-cols-[1fr_auto] gap-y-4',
      ])}
      {...rest}
    >
      <Author
        author={article?.author}
        createdAt={article?.createdAt}
        className="grid grid-in-[author]"
      />

      <Like article={article} className="grid-in-[likes]" />

      <Link to={`/article/${article.slug}`} className="grid-in-[article]">
        <h2 className="mb-1 text-2xl">{article.title}</h2>
        <p className="mb-4 text-base leading-5 text-base-content/50">{article.description}</p>

        <div className="flex items-center justify-between text-base-content/50">
          <span className="text-xs">Read more…</span>
          <ul className="flex space-x-1">
            {article.tagList.map((tag) => (
              <li key={tag} className="badge badge-outline">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </Component>
  ) : (
    <Component className={classNames([wrapperClass, 'flex flex-col w-full gap-4'])} {...rest}>
      <Author />

      <div className="h-6 w-80 skeleton"></div>
      <div className="h-4 skeleton w-96"></div>
      <div className="flex items-center justify-between">
        <div className="h-3 w-28 skeleton"></div>
        <div className="w-64 h-4 skeleton"></div>
      </div>
    </Component>
  );
}

export default ArticleItem;
