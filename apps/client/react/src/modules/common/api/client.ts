import { QueryClient } from '@tanstack/react-query';
import { initQueryClient } from '@ts-rest/react-query';
import { useMemo } from 'react';

import { contract } from '@realworld/dto';

import { useToken } from '../hooks/token';

export const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });

export const useClient = () => {
  const [token] = useToken();
  const baseHeaders = useMemo(() => ({ authorization: `Token ${token}` }), [token]);

  return initQueryClient(contract, {
    baseUrl: `${window.location.origin}/api`,
    baseHeaders,
  });
};
