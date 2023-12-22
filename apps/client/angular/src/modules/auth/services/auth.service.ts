import { Injectable, inject } from '@angular/core';
import { injectQueryClient } from '@ngneat/query';
import { filter, map, startWith } from 'rxjs';

import { injectUserApi } from '../../../api/api.module';

import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #api = injectUserApi();
  #queryClient = injectQueryClient();
  #storage = inject(AuthStorageService);

  public readonly token$ = this.#storage.token$.asObservable();

  public readonly loginMut = this.#api.login();
  public readonly login$ = this.loginMut.result$;

  public readonly registerMut = this.#api.register();
  public readonly register$ = this.registerMut.result$;

  public readonly userQuery$ = this.#api.getUser().result$;
  public readonly user$ = this.userQuery$.pipe(
    filter((res) => res.isSuccess),
    map((res) => res.data?.user),
    startWith(null)
  );

  public readonly updateUserMut = this.#api.updateUser();
  public readonly updateUser$ = this.updateUserMut.result$;

  public logout() {
    this.#storage.token$.next(null);
    this.#queryClient.setQueriesData({ queryKey: ['user'] }, null);
    this.#queryClient.clear();
  }
}
