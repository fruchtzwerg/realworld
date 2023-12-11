<script setup lang="ts">
// defineProps<{}>()
</script>

<template>
  <component
    :is="$attrs.is || 'div'"
    class="overflow-auto card card-bordered border-base-300 dark:border-neutral"
  >
    <!-- body -->
    <div class="p-0 card-body">
      <slot></slot>
    </div>

    <!-- actions -->
    <div class="px-5 py-3 card-actions bg-base-200">
      <slot name="actions"></slot>
    </div>
  </component>
</template>

<style scoped></style>
