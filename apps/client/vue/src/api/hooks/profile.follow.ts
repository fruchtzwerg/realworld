import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';

import type { Profile } from '@realworld/dto';

import { useApi } from '../client';

export const useToggleFollow = (profile: Ref<Profile | undefined>) => {
  if (!profile.value) return { mutate: () => {}, isPending: computed(() => false) };

  const client = useApi();
  const queryClient = useQueryClient();
  const invalidateQueries = () =>
    [['profile', profile.value!.username], ['article']].forEach((queryKey) =>
      queryClient.invalidateQueries({ queryKey })
    );

  // mutations
  const { mutate: follow, isPending: follow_isPending } = useMutation(
    client.profile.followUser.mutationOptions({
      onSuccess: invalidateQueries,
    })
  );
  const { mutate: unfollow, isPending: unfollow_isPending } = useMutation(
    client.profile.unfollowUser.mutationOptions({
      onSuccess: invalidateQueries,
    })
  );

  // mutation function
  const mutate = () => {
    const fn = profile.value!.following ? unfollow : follow;
    return fn({ params: { username: profile.value!.username } });
  };

  const isPending = computed(() =>
    profile.value!.following ? unfollow_isPending.value : follow_isPending.value
  );

  return { mutate, isPending };
};
