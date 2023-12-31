import { Article } from '@realworld/dto';

import useCommentsGet from '../../../common/api/hooks/comments.get';
import CommentItem from '../comment-item/comment-item';

export interface CommentListProps {
  slug?: Article['slug'];
}

export function CommentList({ slug }: CommentListProps) {
  const { comments } = useCommentsGet(slug);

  return (
    <ol className="space-y-4">
      {comments && slug
        ? comments.map((comment) => (
            <CommentItem as="li" key={comment.id} slug={slug} comment={comment} />
          ))
        : Array.from({ length: 3 }).map((_, index) => <CommentItem as="li" key={index} />)}
    </ol>
  );
}

export default CommentList;
