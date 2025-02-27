<script setup lang="ts">
import type { Article } from '@realworld/dto';
import Author from '../../../common/components/author.vue';
import Like from '../../../common/components/like.vue';

const props = defineProps<{ article?: Article }>();

const wrapperClass = 'py-6 border-t border-t-neutral';
</script>

<template>
  <!-- skeleton -->
  <component
    :is="$attrs.is || 'div'"
    v-if="!props.article"
    :class="[wrapperClass, 'flex flex-col w-full gap-4']"
  >
    <Author created-at="" />

    <div class="h-6 w-80 skeleton"></div>
    <div class="h-4 skeleton w-96"></div>
    <div class="flex items-center justify-between">
      <div class="h-3 w-28 skeleton"></div>
      <div class="w-64 h-4 skeleton"></div>
    </div>
  </component>

  <!-- article -->
  <component
    v-else
    :is="$attrs.is || 'div'"
    :class="[
      wrapperClass,
      'grid grid-areas-[author_likes,article_article] grid-cols-[1fr_auto] gap-y-4',
    ]"
  >
    <!-- author -->
    <Author
      :author="props.article?.author"
      :created-at="props.article?.createdAt"
      class="grid grid-in-[author]"
    />

    <!-- likes -->
    <Like :article="props.article" class="grid-in-[likes]" />

    <!-- article -->
    <router-link :to="`/article/${props.article.slug}`" class="grid-in-[article]">
      <h2 class="mb-1 text-2xl">{{ props.article.title }}</h2>
      <p class="mb-4 text-base leading-5 text-base-content/50">
        {{ props.article.description }}
      </p>

      <div class="flex items-center justify-between text-base-content/50">
        <span class="text-xs">Read more…</span>
        <ul class="flex space-x-1">
          <li v-for="tag in props.article.tagList" :key="tag" class="badge badge-outline">
            {{ tag }}
          </li>
        </ul>
      </div>
    </router-link>
  </component>
</template>

<style scoped></style>
