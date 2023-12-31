import { useQueryClient } from '@tanstack/react-query';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

export function useUserUpdate() {
  const queryClient = useQueryClient();
  const result = useClient().user.updateUser.useMutation({
    onSuccess: (res) => {
      queryClient.setQueriesData({ queryKey: QueryKeyFactory.user.get() }, res);
    },
  });

  return result;
}
