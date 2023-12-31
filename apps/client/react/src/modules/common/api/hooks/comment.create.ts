import { useQueryClient } from '@tanstack/react-query';

import { Article } from '@realworld/dto';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

export function useCommentCreate(slug?: Article['slug']) {
  const queryClient = useQueryClient();

  return useClient().comments.createComment.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeyFactory.comment.getAll(slug) });
    },
  });
}

export default useCommentCreate;
