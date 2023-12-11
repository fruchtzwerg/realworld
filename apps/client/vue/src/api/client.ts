import { tsRestFetchApi, type ApiFetcherArgs } from '@ts-rest/core';
import { initQueryClient } from '@ts-rest/vue-query';

import { contract } from '@realworld/dto';

import { useToken } from '../common/hooks/token.hook';
import { environment } from '../environment/environment';

export const useClient = () => {
  const token = useToken();

  const appendAuthHeader = (args: ApiFetcherArgs) =>
    token.value
      ? {
          ...args,
          headers: { ...args.headers, authorization: `Token ${token.value}` },
        }
      : args;

  const client = initQueryClient(contract, {
    baseUrl: environment.apiUrl,
    api: (args) => tsRestFetchApi(token.value ? appendAuthHeader(args) : args),
    baseHeaders: {},
  });

  return client;
};
