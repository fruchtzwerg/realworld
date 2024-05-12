import { useQueryClient } from '@tanstack/vue-query';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { useToken } from '../../common/hooks/token.hook';
import { useClient } from '../client';

export const useLogin = () => {
  const token = useToken();
  const client = useClient();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, ...rest } = client.user.login.useMutation({
    onSuccess: (res) => {
      token.value = res.body.user.token;
      queryClient.setQueryData(['user'], res);
      router.push('/');
    },
  });

  const user = computed(() => data.value?.body.user);

  return { user, data, ...rest };
};
