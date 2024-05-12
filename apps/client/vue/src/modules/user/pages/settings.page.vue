<script setup lang="ts">
import { UpdateUserSchema, type UpdateUser } from '@realworld/dto';
import { useToken } from '../../../common/hooks/token.hook';
import { shallowSparse } from '@realworld/utils';
import { useUpdateUser } from '../../../api/hooks/user.update';

const token = useToken();
const { mutate, isPending } = useUpdateUser();

const submit = (e: SubmitEvent) => {
  if (!(e.target instanceof HTMLFormElement)) return;

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData) as UpdateUser;

  const user = shallowSparse(UpdateUserSchema.parse(data));

  mutate({ body: { user } });
};
</script>

<template>
  <form
    ref="form"
    @submit.prevent="submit($event as SubmitEvent)"
    class="flex flex-col w-full max-w-xl gap-4 mt-6"
  >
    <h1 class="mx-auto text-[2.5rem] leading-[2.75rem] font-medium">Your Settings</h1>
    <input
      name="image"
      type="text"
      class="input input-bordered"
      placeholder="URL of profile picture"
      :disabled="isPending"
    />
    <input
      name="username"
      type="text"
      class="input input-bordered input-lg"
      placeholder="Username"
      :disabled="isPending"
    />
    <textarea
      name="bio"
      rows="6"
      class="textarea textarea-bordered textarea-lg"
      placeholder="Short bio about you"
      :disabled="isPending"
    />
    <input
      name="email"
      type="text"
      class="input input-bordered input-lg"
      placeholder="Email"
      :disabled="isPending"
    />
    <input
      name="password"
      type="password"
      class="input input-bordered input-lg"
      placeholder="New Password"
      :disabled="isPending"
    />

    <button class="btn btn-primary btn-lg place-self-end" :disabled="isPending">
      <div v-if="isPending" class="loading loading-spinner"></div>
      <span>Update Settings</span>
    </button>

    <div class="my-0 divider" />

    <button
      type="button"
      class="btn btn-outline btn-error place-self-start"
      @click.prevent="token = null"
      :disabled="isPending"
    >
      Or click here to logout.
    </button>
  </form>
</template>

<style scoped></style>
