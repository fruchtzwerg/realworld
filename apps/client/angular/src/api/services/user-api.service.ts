import { Injectable, inject } from '@angular/core';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { from } from 'rxjs';

import { CreateUser, LoginUser, UpdateUser } from '@realworld/dto';

import { AuthStorageService } from '../../modules/auth/services/auth-storage.service';
import { injectRestClient } from '../providers/rest-client.provider';

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
        from(this.#client.user.login({ body: { user: credentials } })),
      onSuccess: (res) => {
        this.#queryClient.setQueriesData({ queryKey: ['user'] }, res);
        this.#authStorage.token$.next(res.user.token);
      },
    });
  }

  public register() {
    return this.#mutation({
      mutationFn: (credentials: CreateUser) =>
        from(this.#client.user.createUser({ body: { user: credentials } })),
      onSuccess: (res) => {
        this.#queryClient.setQueriesData({ queryKey: ['user'] }, res);
        this.#authStorage.token$.next(res.user.token);
      },
    });
  }

  public getUser() {
    return this.#query({
      queryKey: ['user'] as const,
      queryFn: () => from(this.#client.user.getUser()),
      enabled: !!this.#authStorage.token$.value,
      staleTime: Infinity,
    });
  }

  public updateUser() {
    return this.#mutation({
      mutationFn: (user: UpdateUser) =>
        from(this.#client.user.updateUser({ body: { user } })),
      onSuccess: (dto) => {
        this.#queryClient.setQueriesData({ queryKey: ['user'] }, dto);
        this.#queryClient.invalidateQueries({ queryKey: ['profile'] });
      },
    });
  }
}
