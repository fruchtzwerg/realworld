import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useUpdateEffect } from 'react-use';

import { useToken } from '../../hooks/token';
import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

const USER_QUERY_KEY = QueryKeyFactory.user.get();

export function useUserGet() {
  const client = useClient();
  const queryClient = useQueryClient();
  const [token, setToken] = useToken();

  const result = client.user.getUser.useQuery(
    USER_QUERY_KEY,
    {},
    { queryKey: USER_QUERY_KEY, enabled: !!token, staleTime: Infinity }
  );

  useUpdateEffect(() => {
    if (result.isSuccess) setToken(result.data.body.user.token);
    else if (result.isError) setToken(null);
  }, [result.isSuccess, result.isError, result.data?.body.user.token, setToken]);

  useEffect(() => {
    if (!token) queryClient.resetQueries({ queryKey: USER_QUERY_KEY });
  }, [token, queryClient]);

  const user = useMemo(() => result.data?.body.user, [result.data?.body.user]);

  return { user, ...result };
}
