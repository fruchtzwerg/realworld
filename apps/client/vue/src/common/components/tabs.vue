<script setup lang="ts">
import type { FunctionalComponent, SVGAttributes } from 'vue';

export interface Tab {
  id: string;
  label: string;
  href?: string;
  icon?: FunctionalComponent<SVGAttributes, {}, any>;
}

defineProps<{ tabs: Tab[]; selected: Tab['id'] }>();
defineEmits<{ 'update:selected': [id: Tab['id']] }>();
</script>

<template>
  <div>
    <div role="tablist" class="tabs tabs-bordered">
      <a
        role="tab"
        :class="[
          'tab gap-1 tab-border-none',
          {
            'tab-active active text-primary [--bc:none]': tab.id === selected,
          },
        ]"
        v-for="tab in tabs"
        :key="tab.id"
        @click="$emit('update:selected', tab.id)"
      >
        <component :is="tab.icon" v-if="tab.icon"></component>
        <span>{{ tab.label }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped></style>
