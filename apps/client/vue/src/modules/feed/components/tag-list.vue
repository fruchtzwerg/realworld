<script setup lang="ts">
import { useTags } from '../../../api/hooks/tags.get';

const emit = defineEmits<{ selected: [tag: string] }>();

const { tags, isLoading } = useTags();
</script>

<template>
  <div v-if="isLoading" class="w-64 p-3 min-w-[16rem] skeleton h-52"></div>
  <div v-else class="w-64 h-fit p-3 pt-2 min-w-[16rem] bg-neutral text-neutral-content rounded-box">
    <p class="mb-1">Popular Tags</p>
    <ol class="flex flex-wrap gap-1">
      <template v-if="tags?.length">
        <li v-for="tag in tags" :key="tag">
          <a href="/#" class="badge" @click="emit('selected', tag)">{{ tag }}</a>
        </li>
      </template>
      <li v-else class="text-xl italic text-neutral-content/60">No tags found</li>
    </ol>
  </div>
</template>

<style scoped></style>
