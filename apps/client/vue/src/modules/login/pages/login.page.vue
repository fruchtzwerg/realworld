<script setup lang="ts">
import { useClient } from '../../../api/client';
import { useRouter } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';
import { useToken } from '../../../common/hooks/token.hook';

const token = useToken();
const client = useClient();
const router = useRouter();
const queryClient = useQueryClient();

const { mutate, isPending } = client.user.login.useMutation({
  onSuccess: (res) => {
    token.value = res.body.user.token;
    queryClient.setQueryData(['user'], res);
    router.push('/');
  },
});

const submit = (e: SubmitEvent) => {
  const form = e.target;
  if (!(form instanceof HTMLFormElement)) return;

  const formData = new FormData(form);

  mutate({
    body: {
      user: {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      },
    },
  });
};
</script>

<template>
  <div class="flex flex-col items-center max-w-xl mt-6 space-y-4">
    <h1 class="text-[2.5rem] leading-[2.75rem] font-medium">Sign in</h1>
    <p class="!mt-2 text-primary">Need an account?</p>

    <form
      ref="form"
      @submit.prevent="submit($event as SubmitEvent)"
      class="flex flex-col w-full gap-4"
    >
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
        placeholder="Password"
        :disabled="isPending"
      />

      <button
        class="btn btn-primary btn-lg place-self-end"
        :disabled="isPending"
      >
        <div v-if="isPending" class="loading loading-spinner"></div>
        <span>Sign in</span>
      </button>
    </form>
  </div>
</template>

<style scoped></style>
