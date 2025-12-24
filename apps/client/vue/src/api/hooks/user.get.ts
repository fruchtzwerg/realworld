import { computed } from 'vue';

import { useToken } from '../../common/hooks/token.hook';
import { useApi } from '../client';
import { useQuery } from '@tanstack/vue-query';

export const useUser = () => {
  const client = useApi();
  const token = useToken();

  const { data, ...rest } = useQuery(
    computed(() =>
      client.user.getUser.queryOptions({
        queryKey: ['user'],
        staleTime: Infinity,
        enabled: !!token.value,
      })
    )
  );

  const user = computed(() => data.value?.user);

  return { user, ...rest };
};
