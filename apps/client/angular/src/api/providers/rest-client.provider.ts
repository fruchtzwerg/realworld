import { HttpClient } from '@angular/common/http';
import { InjectionToken, Provider, inject } from '@angular/core';
import { initClient } from '@ts-rest/core';

import { contract } from '@realworld/dto';

import { environment } from '../../environment/environment';
import { AuthStorageService } from '../../modules/auth/services/auth-storage.service';
import { customHttpClient } from '../utils/http.client';

const factory = (http: HttpClient, storage: AuthStorageService) =>
  initClient(contract, {
    baseUrl: environment.apiUrl,
    baseHeaders: {},
    throwOnUnknownStatus: true,
    api: customHttpClient(http, storage),
  });

export const REST_CLIENT = new InjectionToken<ReturnType<typeof factory>>('REST_CLIENT');

export const restClient: Provider = {
  provide: REST_CLIENT,
  useFactory: factory,
  deps: [HttpClient, AuthStorageService],
};

export const injectRestClient = () => inject(REST_CLIENT);
