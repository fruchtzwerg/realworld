import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { Profile, contract } from '@realworld/dto';
import type { InferContractRouterOutputs } from '@orpc/contract';

import { useClient } from '../client';
import { QueryKeyFactory } from '../query-key.factory';

type ProfileOutputs = InferContractRouterOutputs<typeof contract.profile>;
type ProfileResponse = ProfileOutputs['getProfile'];

export function useToggleFollow(profile?: Profile) {
  const client = useClient();
  const queryClient = useQueryClient();

  const onMutate = (following: boolean) => () => {
    queryClient.setQueriesData<ProfileResponse>(
      { queryKey: QueryKeyFactory.profile.get() },
      (res) =>
        res
          ? {
              ...res,
              profile: {
                ...res.profile,
                following,
              },
            }
          : res
    );
  };

  const onSuccess = () => (res: ProfileResponse) => {
    queryClient.setQueriesData({ queryKey: QueryKeyFactory.profile.get() }, res);
  };

  const { mutate: follow, ...resultFollow } = useMutation(
    client.profile.followUser.mutationOptions({
      onMutate: onMutate(true),
      onSuccess: onSuccess(),
    })
  );

  const { mutate: unfollow, ...resultUnfollow } = useMutation(
    client.profile.unfollowUser.mutationOptions({
      onMutate: onMutate(false),
      onSuccess: onSuccess(),
    })
  );

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
