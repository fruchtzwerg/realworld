import { HttpClient } from '@angular/common/http';
import { InjectionToken, Provider, inject } from '@angular/core';
import { createORPCClient } from '@orpc/client';
import { OpenAPILink } from '@orpc/openapi-client/fetch';
import type { ContractRouterClient } from '@orpc/contract';
import { firstValueFrom } from 'rxjs';

import { contract } from '@realworld/dto';

import { environment } from '../../environment/environment';
import { AuthStorageService } from '../../modules/auth/services/auth-storage.service';

const factory = (http: HttpClient, storage: AuthStorageService) => {
  const link = new OpenAPILink(contract, {
    url: environment.apiUrl,
    headers: () =>
      storage.token$.value
        ? { authorization: `Token ${storage.token$.value}` }
        : {},
    fetch: async (request) => {
      const response = await firstValueFrom(
        http.request(request.method, request.url, {
          body: await request.text(),
          headers: Object.fromEntries(request.headers.entries()),
          observe: 'response',
          responseType: 'arraybuffer',
        })
      );

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(
          Object.fromEntries(
            response.headers.keys().map((k) => [k, response.headers.get(k)!])
          )
        ),
      });
    },
  });

  return createORPCClient(link);
};

export const REST_CLIENT = new InjectionToken<
  ContractRouterClient<typeof contract>
>('REST_CLIENT');

export const restClient: Provider = {
  provide: REST_CLIENT,
  useFactory: factory,
  deps: [HttpClient, AuthStorageService],
};

export const injectRestClient = () => inject(REST_CLIENT);
