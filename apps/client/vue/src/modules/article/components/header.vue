<script setup lang="ts">
import { useArticle } from '../../../api/hooks/article.get';
import { computed } from 'vue';
import Impression from './impression.vue';

const props = defineProps<{ slug: string }>();

const { article } = useArticle(computed(() => props.slug));

const wrapperClass = 'max-w-6xl px-4 mx-auto space-y-8';
</script>

<template>
  <div class="p-8 mb-8 bg-neutral text-neutral-content">
    <!-- skeleton -->
    <div v-if="!article" :class="wrapperClass">
      <div class="h-12 w-96 skeleton" />
      <Impression />
    </div>

    <!-- content -->
    <div v-else :class="wrapperClass">
      <h1 class="text-5xl font-semibold">{{ article.title }}</h1>
      <Impression :article="article" contrast />
    </div>
  </div>
</template>

<style scoped></style>
