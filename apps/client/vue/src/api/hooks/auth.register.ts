import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { useToken } from '../../common/hooks/token.hook';
import { useApi } from '../client';

export const useRegister = () => {
  const token = useToken();
  const client = useApi();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, ...rest } = useMutation(
    client.user.createUser.mutationOptions({
      onSuccess: (res) => {
        token.value = res.user.token;
        queryClient.setQueryData(['user'], res);
        router.push('/');
      },
    })
  );

  const user = computed(() => data.value?.user);

  return { user, data, ...rest };
};
