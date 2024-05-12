<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue';
import Tabs, { type Tab } from '../../../common/components/tabs.vue';
import TagList from '../components/tag-list.vue';
import { isNotNull } from '@realworld/utils';
import IconPound from 'virtual:icons/ion/pound';
import { useRoute } from 'vue-router';
import ArticleList from '../components/article-list.vue';
import type { User } from '@realworld/dto';
import { useProfile } from '../../../api/hooks/profile.get';

const props = defineProps<{
  username?: User['username'];
  isPrivate?: boolean;
}>();

const { profile } = useProfile(computed(() => props.username));

const selectedTab = shallowRef<Tab | null>(null);
const selectedTabId = ref<Tab['id']>(props.isPrivate ? 'my_posts' : 'global');
const route = useRoute();
const path = computed(() => route.path);

watch(path, (newValue, oldValue) => {
  if (oldValue === newValue) return;

  if (newValue === '/') selectedTabId.value = 'global';
  else if (newValue.startsWith('/profile')) {
    selectedTabId.value = 'my_posts';
    selectedTab.value = null;
  }
});

const tabs = computed<Tab[]>(() =>
  props.isPrivate
    ? [
        { id: 'my_posts', label: 'My Posts' },
        { id: 'favorited', label: 'Favorited Posts' },
      ]
    : [
        profile.value ? { id: 'feed', label: 'Your Feed' } : null,
        { id: 'global', label: 'Global Feed' },
        selectedTab.value,
      ].filter(isNotNull)
);

watch(selectedTabId, (id) => {
  if (['global', 'feed'].includes(id)) selectedTab.value = null;
});

const query = computed(() => ({
  author: props.isPrivate && selectedTabId.value === 'my_posts' ? props.username : undefined,
  favorited: props.isPrivate && selectedTabId.value === 'favorited' ? props.username : undefined,
  tag: selectedTab.value?.id,
  enabled: props.isPrivate ? !!profile?.value ?? true : true,
}));
</script>

<template>
  <div
    class="grid grid-areas-[tags,feed] grid-cols-1 md:grid-areas-[feed_tags] md:grid-cols-[1fr_auto] gap-8"
  >
    <div class="grid-in-[feed]">
      <!-- tabs -->
      <Tabs :tabs="tabs" v-model:selected="selectedTabId" class="w-fit" />

      <!-- articles -->
      <ArticleList
        v-if="!props.isPrivate || profile"
        :query="query"
        :is-feed="selectedTabId === 'feed'"
      />
    </div>

    <!-- tags -->
    <TagList
      v-if="!props.isPrivate"
      class="grid-in-[tags] w-full md:w-4"
      @selected="
        selectedTab = {
          id: $event,
          label: $event,
          icon: IconPound,
        };
        selectedTabId = $event;
      "
    />
  </div>
</template>

<style scoped></style>
