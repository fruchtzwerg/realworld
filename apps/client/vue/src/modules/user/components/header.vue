<script setup lang="ts">
import type { User } from '@realworld/dto';
import { Avatar } from '../../../common/components/avatar';
import { useProfile } from '../../../api/hooks/profile.get';
import IconSettings from 'virtual:icons/ion/gear-a';
import { computed } from 'vue';
import { useUser } from '../../../api/hooks/user.get';
import Follow from '../../../common/components/follow.vue';

const props = defineProps<{ username: User['username'] }>();

const { profile } = useProfile(computed(() => props.username));
const { user } = useUser();

const wrapperClass = 'p-8 mb-8 bg-neutral text-neutral-content';
</script>

<template>
  <!-- skeleton -->
  <div v-if="!profile" :class="wrapperClass">
    <div class="flex flex-col items-center max-w-6xl gap-4 mx-auto">
      <Avatar :user="null" size="xl" />

      <div class="w-40 h-6 skeleton" />
      <div v-for="index in 3" class="h-4 skeleton w-[60ch]" :key="index" />
      <div class="h-8 skeleton w-44 place-self-end" />
    </div>
  </div>

  <!-- profile -->
  <div v-else :class="wrapperClass">
    <div class="flex flex-col items-center max-w-6xl px-4 mx-auto space-y-2">
      <!-- avatar -->
      <Avatar :user="profile" size="xl"></Avatar>

      <!-- username -->
      <h1 class="text-2xl font-bold text-center">{{ profile.username }}</h1>

      <!-- bio -->
      <p class="text-base font-light text-center max-w-[60ch]">
        {{ profile.bio }}
      </p>

      <!-- actions -->
      <div class="space-x-2 place-self-end">
        <!-- follow -->
        <Follow v-if="username !== user?.username" :username="username" />

        <!-- to settings -->
        <router-link v-else to="/settings" class="btn btn-outline btn-sm btn-accent">
          <IconSettings />
          <span>Edit Profile Settings</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
