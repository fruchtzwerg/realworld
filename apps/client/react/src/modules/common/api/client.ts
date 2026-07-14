import { QueryClient } from '@tanstack/react-query';
import { createORPCClient } from '@orpc/client';
import { OpenAPILink } from '@orpc/openapi-client/fetch';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';
import type { ContractRouterClient } from '@orpc/contract';
import { useMemo } from 'react';

import { contract } from '@realworld/dto';

import { useToken } from '../hooks/token';

export const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });

export const useClient = () => {
  const [token] = useToken();

  const api = useMemo(() => {
    const link = new OpenAPILink(contract, {
      url: `${window.location.origin}/api`,
      headers: () => (token ? { authorization: `Token ${token}` } : {}),
    });

    const orpcClient: ContractRouterClient<typeof contract> = createORPCClient(link);

    return createTanstackQueryUtils(orpcClient);
  }, [token]);

  return api;
};
