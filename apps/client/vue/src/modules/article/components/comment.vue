<script setup lang="ts">
import { formatter } from '@realworld/utils';
import CommentShell from './comment-shell.vue';
import { useUser } from '../../../api/hooks/user.get';
import { useDeleteComment } from '../../../api/hooks/comment.delete';
import type { Article, Comment } from '@realworld/dto';
import IconDelete from 'virtual:icons/ion/trash-a';
import { toRef } from 'vue';
import { Avatar } from '../../../common/components/avatar';

const props = defineProps<{ slug: Article['slug']; comment?: Comment }>();
const slug = toRef(props, 'slug');

const { user } = useUser();

const { mutate: deleteComment, isPending: isDeletePending } = useDeleteComment(slug);
</script>

<template>
  <!-- skeleton -->
  <div v-if="!comment" class="w-full h-40 skeleton" />

  <CommentShell v-else :is="$attrs.is || 'div'">
    <!-- text -->
    <div class="p-4">{{ comment.body }}</div>

    <!-- actions -->
    <template #actions>
      <div class="flex justify-between w-full">
        <div class="flex items-center space-x-1 text-sm font-light">
          <!-- author -->
          <Avatar size="sm" :user="comment.author" />
          <router-link
            :to="`/profile/${comment.author.username}`"
            class="text-primary hover:link link-primary"
          >
            {{ comment.author.username }}
          </router-link>
          <span>{{ formatter.format(new Date(comment.updatedAt)) }}</span>
        </div>

        <!-- delete comment -->
        <button
          v-if="comment.author.username === user?.username"
          class="btn btn-ghost btn-square btn-sm"
          @click="deleteComment({ params: { id: comment.id, slug } })"
          :disabled="isDeletePending"
        >
          <div v-if="isDeletePending" class="loading loading-spinner" />
          <IconDelete v-else />
        </button>
      </div>
    </template>
  </CommentShell>
</template>

<style scoped></style>
