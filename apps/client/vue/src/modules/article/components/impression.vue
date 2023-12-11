<script setup lang="ts">
import type { Article } from '@realworld/dto';
import Author from '../../../common/components/author.vue';
import IconHeart from 'virtual:icons/ion/heart';
import Like from '../../../common/components/like.vue';
import { useUser } from '../../../api/hooks/user.get';
import Follow from '../../../common/components/follow.vue';

defineProps<{ article?: Article; contrast?: boolean }>();

const { user } = useUser();

const wrapperClass = 'flex space-x-6';
</script>

<template>
  <!-- skeleton -->
  <div v-if="!article" :class="[wrapperClass, $attrs.class]">
    <Author created-at="" />
    <div class="h-8 w-36 skeleton" />
    <div class="h-8 w-36 skeleton" />
  </div>

  <!-- content -->
  <div v-else :class="[wrapperClass, $attrs.class]">
    <!-- author -->
    <Author :author="article.author" :created-at="article.createdAt" />

    <!-- actions -->
    <div class="flex items-center space-x-2">
      <!-- follow author -->
      <Follow :username="article.author.username" />

      <!-- like article -->
      <Like :article="article" class="!btn-sm">
        <IconHeart />
        <span v-if="user">Favorite Article</span>
        <span> {{ article.favoritesCount }}</span>
      </Like>
    </div>
  </div>
</template>

<style scoped></style>
