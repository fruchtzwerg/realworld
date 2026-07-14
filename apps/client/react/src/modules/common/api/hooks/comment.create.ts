import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Article } from '@realworld/dto';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

export function useCommentCreate(slug?: Article['slug']) {
  const client = useClient();
  const queryClient = useQueryClient();

  return useMutation(
    client.comments.createComment.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QueryKeyFactory.comment.getAll(slug) });
      },
    })
  );
}

export default useCommentCreate;
