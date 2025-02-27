<script setup lang="ts">
import type { Article } from '@realworld/dto';
import { formatter } from '@realworld/utils';
import { Avatar } from './avatar';

const props = defineProps<{
  author?: Article['author'];
  createdAt: Article['createdAt'];
}>();
</script>

<template>
  <!-- skeleton -->
  <div v-if="!props.author" :class="['flex items-center gap-4', $attrs.class]">
    <Avatar :user="null" size="md" />
    <div class="flex flex-col gap-2">
      <div class="h-4 w-14 skeleton"></div>
      <div class="w-24 h-3 skeleton"></div>
    </div>
  </div>

  <!-- author -->
  <div
    v-else
    :class="[
      'grid grid-areas-[avatar_name,avatar_created] grid-cols-[auto,1fr] gap-x-2 items-center w-fit',
      $attrs.class,
    ]"
  >
    <!-- avatar -->
    <Avatar :user="props.author" size="md" class="grid-in-[avatar]" />

    <!-- username -->
    <router-link
      :to="`/profile/${props.author.username}`"
      class="grid-in-[name] hover:link text-primary link-primary w-fit"
    >
      {{ props.author.username }}
    </router-link>
    <!-- article createdAt -->
    <span class="grid-in-[created] text-xs text-base-300 dark:text-base-content/50">
      {{ formatter.format(new Date(props.createdAt)) }}
    </span>
  </div>
</template>

<style scoped></style>
