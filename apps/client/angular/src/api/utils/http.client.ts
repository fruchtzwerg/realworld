import { HttpErrorResponse, type HttpClient, HttpHeaders } from '@angular/common/http';
import type { ApiFetcher } from '@ts-rest/core';
import { catchError, firstValueFrom } from 'rxjs';

import { AuthStorageService } from '../../modules/auth/services/auth-storage.service';

import { ApiError } from './api.error';

function normalizeHeaders(headers: HttpHeaders) {
  const headersDict: HeadersInit = headers.keys().reduce((acc, key) => {
    acc[key] = headers.get(key) as string;
    return acc;
  }, {} as Record<string, string>);

  const resHeaders: Headers = new Headers(headersDict);
  return resHeaders;
}

export const customHttpClient =
  (http: HttpClient, storage: AuthStorageService): ApiFetcher =>
  async ({ body, headers, method, path }) => {
    const request = http
      .request(method, path, {
        body,
        headers: { ...headers, authorization: `Token ${storage.token$.value}` },
        observe: 'response',
      })
      .pipe(
        catchError(async (error: unknown) => {
          switch (true) {
            case error instanceof HttpErrorResponse: {
              // workaround for angular-compiler bug
              const err = error as HttpErrorResponse;
              console.error(err.name, err.status, error);
              return { body: err.error, headers: err.headers, status: err.status };
            }

            case error instanceof ApiError: {
              const err = error as ApiError;
              console.error(err.name, err.statusCode, error);
              return { body: err.message, headers: new HttpHeaders(), status: err.statusCode };
            }

            default: {
              const err = error as HttpErrorResponse;
              return { body: err.error, headers: err.headers, status: err.status };
            }
          }
        })
      );

    const res = await firstValueFrom(request);

    return {
      body: res.body,
      headers: normalizeHeaders(res.headers),
      status: res.status,
    };
  };
