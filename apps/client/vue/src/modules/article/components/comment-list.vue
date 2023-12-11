<script setup lang="ts">
import type { Article } from '@realworld/dto';
import { toRef } from 'vue';
import Comment from './comment.vue';
import { useComments } from '../../../api/hooks/comments.get';

const props = defineProps<{ slug: Article['slug'] }>();
const slug = toRef(props, 'slug');

const { comments } = useComments(slug);
</script>

<template>
  <ol class="space-y-4">
    <!-- skeleton -->
    <template v-if="!comments">
      <Comment :slug="slug" v-for="index in 3" :key="index" />
    </template>

    <!-- comment -->
    <Comment
      v-else
      is="li"
      v-for="comment in comments"
      :key="comment.id"
      :slug="slug"
      :comment="comment"
    />
  </ol>
</template>

<style scoped></style>
