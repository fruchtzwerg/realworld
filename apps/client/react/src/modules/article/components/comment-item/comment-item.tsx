import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import IconDelete from 'virtual:icons/ion/trash-a';

import { Article, Comment } from '@realworld/dto';
import { formatter } from '@realworld/utils';

import useCommentDelete from '../../../common/api/hooks/comment.delete';
import { useUserGet } from '../../../common/api/hooks/user.get';
import Avatar from '../../../common/components/avatar/avatar';
import CommentShell from '../comment-shell/comment-shell';

export interface CommentItemProps<T extends keyof HTMLElementTagNameMap>
  extends HTMLAttributes<HTMLElementTagNameMap[T]> {
  as: T;
  slug?: Article['slug'];
  comment?: Comment;
}

export function CommentItem<T extends keyof HTMLElementTagNameMap>({
  as,
  slug,
  comment,
}: CommentItemProps<T>) {
  const { user } = useUserGet();
  const { mutate: deleteComment, isPending } = useCommentDelete(slug);

  return comment ? (
    <CommentShell
      as={as}
      actions={
        <div className="flex justify-between w-full">
          <div className="flex items-center space-x-1 text-sm font-light">
            <Avatar size="sm" user={comment.author} />
            <Link
              to={`/profile/${comment.author.username}`}
              className="text-primary hover:link link-primary"
            >
              {comment.author.username}
            </Link>
            <span>{formatter.format(new Date(comment.updatedAt))}</span>
          </div>

          {comment.author.username === user?.username && (
            <button
              className="btn btn-ghost btn-square btn-sm"
              onClick={() => deleteComment({ params: { id: comment.id, slug: slug! } })}
              disabled={isPending}
            >
              {isPending ? <div className="loading loading-spinner" /> : <IconDelete />}
            </button>
          )}
        </div>
      }
    >
      <div className="p-4">{comment.body}</div>
    </CommentShell>
  ) : (
    <div className="w-full h-40 skeleton" />
  );
}

export default CommentItem;
