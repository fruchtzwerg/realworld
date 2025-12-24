import { createORPCClient } from '@orpc/client';
import { OpenAPILink } from '@orpc/openapi-client/fetch';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';

import { contract } from '@realworld/dto';

import { useToken } from '../common/hooks/token.hook';
import { environment } from '../environment/environment';
import { type ContractRouterClient } from '@orpc/contract';

export const useApi = () => {
  const token = useToken();

  const link = new OpenAPILink(contract, {
    url: environment.apiUrl,
    headers: () => (token.value ? { authorization: `Token ${token.value}` } : {}),
  });

  const client: ContractRouterClient<typeof contract> = createORPCClient(link);

  return createTanstackQueryUtils(client);
};
