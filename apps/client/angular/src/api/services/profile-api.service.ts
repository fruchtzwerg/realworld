import { Injectable } from '@angular/core';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { from, map } from 'rxjs';

import { Article, Profile, ProfileDto, ProfileParams } from '@realworld/dto';

import { injectRestClient } from '../providers/rest-client.provider';

@Injectable({
  providedIn: 'root',
})
export class ProfileApiService {
  #client = injectRestClient();
  #queryClient = injectQueryClient();
  #query = injectQuery();
  #mutation = injectMutation();

  /** Get a profile by username. */
  public getProfile(username: string) {
    return this.#query({
      queryKey: ['profile', username] as const,
      queryFn: () =>
        from(this.#client.profile.getProfile({ params: { username } })).pipe(
          map((dto: ProfileDto) => dto.profile)
        ),
      staleTime: 60 * 1_000,
    });
  }

  /** Follow a user profile. */
  public followUser() {
    return this.#mutation({
      mutationFn: ({ username }: ProfileParams) =>
        from(this.#client.profile.followUser({ params: { username } })),
      onMutate: this.onFollowChanges(true),
      onSuccess: this.onFollowSuccess(),
    });
  }

  /** Unfollow a user profile. */
  public unfollowUser() {
    return this.#mutation({
      mutationFn: ({ username }: ProfileParams) =>
        from(this.#client.profile.unfollowUser({ params: { username } })),
      onMutate: this.onFollowChanges(false),
      onSuccess: this.onFollowSuccess(),
    });
  }

  /** Optimistically update caches. */
  private onFollowChanges(following: Profile['following']) {
    return ({ username }: ProfileParams) => {
      this.#queryClient.setQueryData<Profile>(['profile', username], (profile) => ({
        ...profile!,
        following,
      }));
      this.#queryClient.setQueriesData<Article>({ queryKey: ['article'] }, (article) => ({
        ...article!,
        author: { ...article!.author, following },
      }));
      this.#queryClient.invalidateQueries({ queryKey: ['feed'] });
    };
  }

  /** Update caches on success. */
  private onFollowSuccess() {
    return ({ profile }: ProfileDto) => {
      this.#queryClient.setQueryData<Profile>(['profile', profile.username], profile);
      this.#queryClient.setQueriesData<Article>({ queryKey: ['article'] }, (article) => ({
        ...article!,
        author: profile,
      }));
    };
  }
}
