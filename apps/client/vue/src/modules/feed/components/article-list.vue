<script setup lang="ts">
import type { ArticlesQuery } from '@realworld/dto';
import { computed } from 'vue';
import { useArticles } from '../../../api/hooks/articles.get';
import Article from '../components/article.vue';
import { useFeed } from '../../../api/hooks/feed.get';

type Props = { query?: ArticlesQuery; isFeed?: boolean };

const props = defineProps<Props>();

const { articles: list, isPending: list_isPending } = useArticles({
  author: computed(() => props.query?.author),
  favorited: computed(() => props.query?.favorited),
  tag: computed(() => props.query?.tag),
  offset: computed(() => props.query?.offset),
  limit: computed(() => props.query?.limit),
  enabled: computed(() => !props.isFeed),
});
const { articles: feed, isPending: feed_isPending } = useFeed({
  offset: computed(() => props.query?.offset),
  limit: computed(() => props.query?.limit),
  enabled: computed(() => props.isFeed),
});

const articles = computed(() => (props.isFeed ? feed.value : list.value));
const isPending = computed(() => (props.isFeed ? feed_isPending.value : list_isPending.value));
</script>

<template>
  <!-- feed loader -->
  <ol v-if="isPending" class="w-full">
    <Article is="li" v-for="index in 3" :key="index" />
  </ol>

  <!-- feed -->
  <ol v-else class="w-full">
    <Article is="li" v-for="article in articles" :key="article.slug" :article="article" />
  </ol>
</template>

<style scoped></style>
