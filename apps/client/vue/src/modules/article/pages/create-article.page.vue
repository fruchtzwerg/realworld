<script setup lang="ts">
import { CreateArticleSchema, type CreateArticle } from '@realworld/dto';
import { useCreateArticle } from '../../../api/hooks/article.create';

const { mutate, isPending } = useCreateArticle();

const submit = (e: SubmitEvent) => {
  if (!(e.target instanceof HTMLFormElement)) return;

  const formData = new FormData(e.target);
  const { tagList, ...data } = Object.fromEntries(formData) as CreateArticle & {
    tagList: string | null | undefined;
  };

  const article = CreateArticleSchema.parse({
    ...data,
    tagList:
      tagList
        ?.toString()
        .split(',')
        .map((s) => s.trim()) ?? [],
  });

  mutate({ body: { article } });
};
</script>

<template>
  <form
    ref="form"
    @submit.prevent="submit($event as SubmitEvent)"
    class="flex flex-col w-full max-w-4xl gap-4 mt-8"
  >
    <input
      name="title"
      type="text"
      class="input input-bordered input-lg"
      placeholder="Article title"
      :disabled="isPending"
    />
    <input
      name="description"
      type="text"
      class="input input-bordered"
      placeholder="What's this article about?"
      :disabled="isPending"
    />
    <textarea
      name="body"
      rows="8"
      class="textarea textarea-bordered"
      placeholder="Write your article (in markdown)"
      :disabled="isPending"
    />
    <input
      name="tagList"
      type="text"
      class="input input-bordered"
      placeholder="Enter tags"
      :disabled="isPending"
    />

    <button class="btn btn-primary btn-lg place-self-end" :disabled="isPending">
      <div v-if="isPending" class="loading loading-spinner"></div>
      <span>Publish Article</span>
    </button>
  </form>
</template>

<style scoped></style>
