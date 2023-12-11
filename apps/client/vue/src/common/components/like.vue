<script setup lang="ts">
import IconHeart from 'virtual:icons/ion/heart';
import type { Article } from '@realworld/dto';
import { useUser } from '../../api/hooks/user.get';
import { useToggleFavorite } from '../../api/hooks/article.favorite';
import { toRef } from 'vue';

const props = defineProps<{ article?: Article }>();
const article = toRef(props, 'article');

const { user } = useUser();

const { mutate: toggleLike } = useToggleFavorite(article);
</script>

<template>
  <!-- skeleton -->
  <div v-if="!article" class="w-10 h-4 skeleton" />

  <!-- button -->
  <button
    v-else
    :class="[
      'btn btn-xs btn-outline btn-primary min-w-[4rem]',
      { 'disabled:btn-primary': !user },
      { 'btn-active active': article.favorited },
      $attrs.class,
    ]"
    :disabled="!user"
    @click="user ? toggleLike() : null"
  >
    <slot>
      <IconHeart />
      <span>{{ article.favoritesCount }}</span>
    </slot>
  </button>
</template>

<style scoped></style>
