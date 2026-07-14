import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

export function useUserUpdate() {
  const client = useClient();
  const queryClient = useQueryClient();
  const result = useMutation(
    client.user.updateUser.mutationOptions({
      onSuccess: (res) => {
        queryClient.setQueriesData({ queryKey: QueryKeyFactory.user.get() }, res);
      },
    })
  );

  return result;
}
