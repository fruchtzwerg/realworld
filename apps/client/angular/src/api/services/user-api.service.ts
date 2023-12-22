import { Injectable, inject } from '@angular/core';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { from, map } from 'rxjs';

import { CreateUser, LoginUser, UpdateUser } from '@realworld/dto';

import { AuthStorageService } from '../../modules/auth/services/auth-storage.service';
import { injectRestClient } from '../providers/rest-client.provider';
import { ApiError } from '../utils/api.error';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  #client = injectRestClient();
  #queryClient = injectQueryClient();
  #query = injectQuery();
  #mutation = injectMutation();
  #authStorage = inject(AuthStorageService);

  public login() {
    return this.#mutation({
      mutationFn: (credentials: LoginUser) =>
        from(this.#client.user.login({ body: { user: credentials } })).pipe(
          map((res) => {
            if (res.status === 200) return res.body;
            throw new ApiError('login', res.status);
          })
        ),
      onSuccess: (res) => {
        this.#queryClient.setQueriesData({ queryKey: ['user'] }, res);
        this.#authStorage.token$.next(res.user.token);
      },
    });
  }

  public register() {
    return this.#mutation({
      mutationFn: (credentials: CreateUser) =>
        from(this.#client.user.createUser({ body: { user: credentials } })).pipe(
          map((res) => {
            if (res.status === 201) return res.body;
            throw new ApiError('register', res.status);
          })
        ),
      onSuccess: (res) => {
        this.#queryClient.setQueriesData({ queryKey: ['user'] }, res);
        this.#authStorage.token$.next(res.user.token);
      },
    });
  }

  public getUser() {
    return this.#query({
      queryKey: ['user'] as const,
      queryFn: () =>
        from(this.#client.user.getUser()).pipe(
          map((res) => {
            if (res.status === 200) return res.body;
            throw new ApiError('getUser', res.status);
          })
        ),
      enabled: !!this.#authStorage.token$.value,
      staleTime: Infinity,
    });
  }

  public updateUser() {
    return this.#mutation({
      mutationFn: (user: UpdateUser) =>
        from(this.#client.user.updateUser({ body: { user } })).pipe(
          map((res) => {
            if (res.status === 200) return res.body;
            throw new ApiError('updateUser', res.status);
          })
        ),
      onSuccess: (dto) => {
        this.#queryClient.setQueriesData({ queryKey: ['user'] }, dto);
        this.#queryClient.invalidateQueries({ queryKey: ['profile'] });
      },
    });
  }
}
