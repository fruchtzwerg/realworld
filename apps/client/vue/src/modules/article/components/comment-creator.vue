<script setup lang="ts">
import { CreateCommentSchema, type Article } from '@realworld/dto';
import { useCreateComment } from '../../../api/hooks/comment.create';
import { useUser } from '../../../api/hooks/user.get';
import { toRef } from 'vue';
import CommentShell from './comment-shell.vue';
import { Avatar } from '../../../common/components/avatar';
import Comment from './comment.vue';

const props = defineProps<{ slug: Article['slug'] }>();
const slug = toRef(props, 'slug');

const { user } = useUser();

const { mutateAsync: postComment, isPending: isCreatePending } = useCreateComment(slug);

const submitComment = async (e: SubmitEvent) => {
  const form = e.target;
  if (!(form instanceof HTMLFormElement)) return;

  const formData = new FormData(form);
  const comment = CreateCommentSchema.parse({
    body: formData.get('comment'),
  });

  if (!comment.body) return;

  await postComment({ params: { slug: slug.value }, body: { comment } });

  form.reset();
};
</script>

<template>
  <div class="space-y-4">
    <!-- comment creator -->
    <CommentShell is="form" v-if="user" @submit.prevent="submitComment($event as SubmitEvent)">
      <textarea
        name="comment"
        rows="4"
        class="textarea textarea-ghost"
        placeholder="Write a comment…"
      />

      <template #actions>
        <div class="flex justify-between w-full">
          <!-- author -->
          <Avatar size="sm" :user="user" />

          <!-- action -->
          <button class="btn btn-primary btn-sm" :disabled="isCreatePending">
            <div v-if="isCreatePending" class="loading loading-spinner" />
            <span>Post Comment</span>
          </button>
        </div>
      </template>
    </CommentShell>

    <!-- skeleton -->
    <Comment v-if="isCreatePending" slug="" />
  </div>
</template>

<style scoped></style>
