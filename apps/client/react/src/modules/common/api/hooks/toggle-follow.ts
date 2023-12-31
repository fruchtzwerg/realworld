import { useQueryClient } from '@tanstack/react-query';
import { ClientInferResponses } from '@ts-rest/core';
import { useCallback, useMemo } from 'react';

import { Profile, contract } from '@realworld/dto';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

type ProfileResponse = ClientInferResponses<typeof contract.profile.getProfile, 200>;

export function useToggleFollow(profile?: Profile) {
  const queryClient = useQueryClient();

  const onMutate = (following: boolean) => () => {
    queryClient.setQueriesData<ProfileResponse>(
      { queryKey: QueryKeyFactory.profile.get() },
      (profile) => ({
        ...profile!,
        body: {
          ...profile!.body,
          profile: {
            ...profile!.body.profile,
            following,
          },
        },
      })
    );
  };

  const onSuccess = () => (res: ProfileResponse) => {
    queryClient.setQueriesData({ queryKey: QueryKeyFactory.profile.get() }, res);
  };

  const { mutate: follow, ...resultFollow } = useClient().profile.followUser.useMutation({
    onMutate: onMutate(true),
    onSuccess: onSuccess(),
  });

  const { mutate: unfollow, ...resultUnfollow } = useClient().profile.unfollowUser.useMutation({
    onMutate: onMutate(false),
    onSuccess: onSuccess(),
  });

  const toggleFollow = useCallback(() => {
    if (!profile) return;

    const fn = profile.following ? unfollow : follow;

    fn({ params: { username: profile.username } });
  }, [profile, follow, unfollow]);

  const result = useMemo(
    () => (profile?.following ? resultUnfollow : resultFollow),
    [profile?.following, resultFollow, resultUnfollow]
  );

  return { toggleFollow, ...result };
}

export default useToggleFollow;
