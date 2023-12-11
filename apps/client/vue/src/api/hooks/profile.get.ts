import { computed, type Ref } from 'vue';

import type { Profile } from '@realworld/dto';

import { useClient } from '../client';

export const useProfile = (username: Ref<Profile['username'] | undefined>) => {
  const client = useClient();

  const usernameRef = computed(() =>
    typeof username === 'string' ? username : username.value
  );

  const { data, ...rest } = client.profile.getProfile.useQuery(
    ['profile', usernameRef],
    () => ({ params: { username: usernameRef.value! } }),
    { staleTime: Infinity, enabled: computed(() => !!usernameRef.value) }
  );

  const profile = computed(() => data.value?.body.profile);

  return { profile, data, ...rest };
};
