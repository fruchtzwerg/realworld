<script setup lang="ts">
import type { LoginUser } from '@realworld/dto';
import { useLogin } from '../../../api/hooks/auth.login';
import type { FormFields } from '../../../common/models/form.model';

const { mutate, isPending } = useLogin();

const fieldClass = 'input input-bordered input-lg';

const fields: FormFields<LoginUser> = {
  email: { class: fieldClass, placeholder: 'Email' },
  password: { class: fieldClass, placeholder: 'Password' },
};

const submit = (e: SubmitEvent) => {
  if (!(e.target instanceof HTMLFormElement)) return;

  const formData = new FormData(e.target);
  const user = Object.fromEntries(formData) as LoginUser;

  mutate({ body: { user } });
};
</script>

<template>
  <div class="flex flex-col items-center max-w-xl mt-6 space-y-4">
    <h1 class="text-[2.5rem] leading-[2.75rem] font-medium">Sign in</h1>
    <router-link to="/register" class="!mt-2 text-primary">Need an account?</router-link>

    <form
      ref="form"
      @submit.prevent="submit($event as SubmitEvent)"
      class="flex flex-col w-full gap-4"
    >
      <input
        v-for="(field, key) in fields"
        :key="key"
        :name="key"
        v-bind="field"
        :disabled="isPending"
      />

      <button type="submit" class="btn btn-primary btn-lg place-self-end" :disabled="isPending">
        <div v-if="isPending" class="loading loading-spinner"></div>
        <span>Sign in</span>
      </button>
    </form>
  </div>
</template>

<style scoped></style>
