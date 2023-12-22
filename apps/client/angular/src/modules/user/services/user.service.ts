import { Injectable } from '@angular/core';
import { ReplaySubject, distinctUntilChanged, filter, map, shareReplay, switchMap } from 'rxjs';

import { Profile } from '@realworld/dto';
import { NullableString } from '@realworld/utils';

import { injectProfileApi } from '../../../api/api.module';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #api = injectProfileApi();

  #username$ = new ReplaySubject<NullableString>(1);

  public setUsername(value: NullableString) {
    this.#username$.next(value);
  }

  public readonly username$ = this.#username$.pipe(distinctUntilChanged());

  public readonly profileQuery$ = this.#username$.pipe(
    filter(Boolean),
    switchMap((username) => this.#api.getProfile(username).result$),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  public readonly profile$ = this.profileQuery$.pipe(
    filter((res) => res.isSuccess),
    map((res) => res.data!)
  );

  public readonly followMut = this.#api.followUser();
  public readonly unfollowMut = this.#api.unfollowUser();

  public toggleFollow(profile: Profile) {
    const action = profile.following ? this.unfollowMut : this.followMut;
    return action.mutate({ username: profile.username });
  }
}
