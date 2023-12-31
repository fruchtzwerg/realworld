import { FormEventHandler } from 'react';

import { Article } from '@realworld/dto';

import useCommentCreate from '../../../common/api/hooks/comment.create';
import { useUserGet } from '../../../common/api/hooks/user.get';
import Avatar from '../../../common/components/avatar/avatar';
import CommentItem from '../comment-item/comment-item';
import CommentShell from '../comment-shell/comment-shell';

export interface CommentCreatorProps {
  slug?: Article['slug'];
}

export function CommentCreator({ slug }: CommentCreatorProps) {
  const { user, isSuccess: isUserSuccess } = useUserGet();
  const { mutate, isPending } = useCommentCreate(slug);

  const submitComment: FormEventHandler = (e) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const comment = formData.get('comment') as string | undefined;
    if (!slug || !comment) return;

    mutate({ params: { slug }, body: { comment: { body: comment } } });

    form.reset();
  };

  return (
    <div className="space-y-4">
      {isUserSuccess && (
        <CommentShell
          as="form"
          onSubmit={submitComment}
          actions={
            <div className="flex justify-between w-full">
              <Avatar size="sm" user={user} />

              <button className="btn btn-primary btn-sm" disabled={isPending}>
                {isPending && <div className="loading loading-spinner" />}
                <span>Post Comment</span>
              </button>
            </div>
          }
        >
          <textarea
            name="comment"
            rows={4}
            className="textarea textarea-ghost"
            placeholder="Write a comment…"
          />
        </CommentShell>
      )}

      {isPending && <CommentItem as="div" />}
    </div>
  );
}

export default CommentCreator;
