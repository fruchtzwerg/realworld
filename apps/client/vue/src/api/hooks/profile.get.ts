import { computed, unref, type MaybeRef } from 'vue';

import type { Profile } from '@realworld/dto';

import { useApi } from '../client';
import { useQuery } from '@tanstack/vue-query';

export const useProfile = (username: MaybeRef<Profile['username'] | undefined>) => {
  const client = useApi();

  const { data, ...rest } = useQuery(
    computed(() => {
      const _username = unref(username);

      return client.profile.getProfile.queryOptions({
        queryKey: ['profile', _username],
        input: { params: { username: _username! } },
        staleTime: Infinity,
        enabled: !!_username,
      });
    })
  );

  const profile = computed(() => data.value?.profile);

  return { profile, data, ...rest };
};
