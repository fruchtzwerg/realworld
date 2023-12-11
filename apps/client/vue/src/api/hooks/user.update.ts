import { useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';

import type { RoutePath } from '../../router/routes.const';
import { useClient } from '../client';

import { useUser } from './user.get';


export const useUpdateUser = (fallbackDest: RoutePath = '/') => {
  const router = useRouter();
  const client = useClient();
  const { user } = useUser();

  const queryClient = useQueryClient();

  const mutation = client.user.updateUser.useMutation({
    onSuccess: (res) => {
      const dest: RoutePath = user.value?.username
        ? `/profile/${user.value?.username}`
        : fallbackDest;

      queryClient.setQueryData(['user'], res);
      router.push(dest);
    },
  });

  return mutation;
};
