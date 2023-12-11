import { computed } from 'vue';

import { useToken } from '../../common/hooks/token.hook';
import { useClient } from '../client';

export const useUser = () => {
  const client = useClient();
  const token = useToken();

  const { data, ...rest } = client.user.getUser.useQuery(['user'], () => ({}), {
    staleTime: Infinity,
    enabled: computed(() => !!token.value),
  });

  const user = computed(() => data.value?.body.user);

  return { user, ...rest };
};
