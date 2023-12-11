<script setup lang="ts">
import { type Article } from '@realworld/dto';
import { useArticle } from '../../../api/hooks/article.get';
import { toRef } from 'vue';
import Impression from '../components/impression.vue';
import CommentList from '../components/comment-list.vue';
import CommentCreator from '../components/comment-creator.vue';
import { getRandomWidth } from '@realworld/utils';

const props = defineProps<{ slug: Article['slug'] }>();
const slug = toRef(props, 'slug');

const { article } = useArticle(slug);
</script>

<template>
  <!-- skeleton -->
  <div v-if="!article" :class="['space-y-2', $attrs.class]">
    <div
      class="h-4 skeleton"
      :style="{ width: getRandomWidth() }"
      v-for="index in 24"
      :key="index"
    />
  </div>

  <!-- article -->
  <div v-else :class="['px-4 pb-8 space-y-6', $attrs.class]">
    <!-- text -->
    <p class="font-serif text-xl">{{ article?.body }}</p>
    <!-- tags -->
    <ul class="flex space-x-1">
      <li
        v-for="tag in article?.tagList"
        :key="tag"
        class="badge badge-outline text-base-content/60"
      >
        {{ tag }}
      </li>
    </ul>

    <div class="divider" />

    <!-- author -->
    <Impression :article="article" class="mx-auto w-fit" />

    <!-- comments -->
    <div class="max-w-2xl mx-auto space-y-4">
      <!-- create comment -->
      <CommentCreator :slug="slug" />

      <!-- comments -->
      <CommentList :slug="slug" />
    </div>
  </div>
</template>

<style scoped></style>
