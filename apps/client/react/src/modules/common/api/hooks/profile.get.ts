import { useMemo } from 'react';

import { Profile } from '@realworld/dto';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

export function useProfileGet(username?: Profile['username']) {
  const queryKey = QueryKeyFactory.profile.get(username);
  const result = useClient().profile.getProfile.useQuery(
    queryKey,
    { params: { username: username! } },
    { queryKey, enabled: !!username }
  );

  const profile = useMemo(() => result.data?.body.profile, [result.data?.body.profile]);

  return { profile, ...result };
}

export default useProfileGet;
