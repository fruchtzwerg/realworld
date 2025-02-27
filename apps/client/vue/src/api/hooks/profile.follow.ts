import { useQueryClient } from '@tanstack/vue-query';
import { computed, type Ref } from 'vue';

import type { Profile } from '@realworld/dto';

import { useClient } from '../client';

export const useToggleFollow = (profile: Ref<Profile | undefined>) => {
  if (!profile.value) return { mutate: () => {}, isPending: computed(() => false) };

  const client = useClient();
  const queryClient = useQueryClient();
  const invalidateQueries = () =>
    [['profile', profile.value!.username], ['article']].forEach((queryKey) =>
      queryClient.invalidateQueries({ queryKey })
    );

  // mutations
  const { mutate: follow, isPending: follow_isPending } = client.profile.followUser.useMutation({
    onSuccess: invalidateQueries,
  });
  const { mutate: unfollow, isPending: unfollow_isPending } =
    client.profile.unfollowUser.useMutation({
      onSuccess: invalidateQueries,
    });

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
