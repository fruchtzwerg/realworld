<script setup lang="ts">
import IconAdd from 'virtual:icons/ion/plus-round';
import IconRemove from 'virtual:icons/ion/minus-round';
import { useUser } from '../../api/hooks/user.get';
import { useToggleFollow } from '../../api/hooks/profile.follow';
import { toRef } from 'vue';
import { useProfile } from '../../api/hooks/profile.get';

const props = defineProps<{ username: string; contrast?: boolean }>();
const username = toRef(props, 'username');

const { user } = useUser();
const { profile, isFetching: profile_isPending } = useProfile(username);

const { mutate: toggleFollow, isPending } = useToggleFollow(profile);
</script>

<template>
  <!-- skeleton -->
  <div v-if="!profile" class="w-10 h-4 skeleton" />

  <!-- button -->
  <button
    v-else
    :class="[
      'btn btn-outline btn-sm',
      {
        'text-neutral-content hover:text-neutral hover:bg-neutral-content':
          contrast,
      },
      { 'btn-active active': profile.following },
    ]"
    :disabled="
      !user ||
      user.username === profile.username ||
      isPending ||
      profile_isPending
    "
    @click="toggleFollow()"
  >
    <slot>
      <IconRemove v-if="profile.following" />
      <IconAdd v-else />
      <span>
        {{ profile.following ? 'Unfollow' : 'Follow' }}
        {{ profile.username }}
      </span>
    </slot>
  </button>
</template>

<style scoped></style>
useToggleFavoriteuseToggleFavorite ../../api/hooks/user.get
