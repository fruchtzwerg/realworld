<script setup lang="ts">
import { useClient } from '../../../api/client';

const emit = defineEmits<{ selected: [tag: string] }>();

const client = useClient();

const { data: tags, isLoading } = client.tags.getTags.useQuery(['tags']);
</script>

<template>
  <div v-if="isLoading" class="w-64 p-3 min-w-[16rem] skeleton h-52"></div>
  <div
    v-else
    class="w-64 h-fit p-3 pt-2 min-w-[16rem] bg-neutral text-neutral-content rounded-box"
  >
    <p class="mb-1">Popular Tags</p>
    <ol class="flex flex-wrap gap-1">
      <li v-for="tag in tags?.body.tags" :key="tag">
        <a href="/#" class="badge" @click="emit('selected', tag)">{{ tag }}</a>
      </li>
    </ol>
  </div>
</template>

<style scoped></style>
