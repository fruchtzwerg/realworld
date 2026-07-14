import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { Profile } from '@realworld/dto';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

export function useProfileGet(username?: Profile['username']) {
  const client = useClient();
  const queryKey = QueryKeyFactory.profile.get(username);
  const result = useQuery(
    client.profile.getProfile.queryOptions({
      queryKey,
      input: { params: { username: username! } },
      enabled: !!username,
    })
  );

  const profile = useMemo(() => result.data?.profile, [result.data?.profile]);

  return { profile, ...result };
}

export default useProfileGet;
