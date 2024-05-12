<script setup lang="ts">
import type { CreateUser } from '@realworld/dto';
import type { FormFields } from '../../../common/models/form.model';
import { useRegister } from '../../../api/hooks/auth.register';

const { mutate, isPending } = useRegister();

const fieldClass = 'input input-bordered input-lg';

const fields: FormFields<CreateUser> = {
  username: { class: fieldClass, placeholder: 'Username' },
  email: { class: fieldClass, placeholder: 'Email' },
  password: { type: 'password', class: fieldClass, placeholder: 'Password' },
};

const submit = (event: Event) => {
  if (!(event.target instanceof HTMLFormElement)) return;

  const formData = new FormData(event.target);
  const user = Object.fromEntries(formData) as CreateUser;

  mutate({ body: { user } });
};
</script>

<template>
  <form class="flex flex-col max-w-xl mt-6 space-y-4" @submit.prevent="submit($event)">
    <h1 class="text-[2.5rem] leading-[2.75rem] font-medium place-self-center">Sign up</h1>
    <router-link to="/login" class="!mt-2 text-primary place-self-center">
      Have an account already?
    </router-link>

    <input
      v-for="(field, key) in fields"
      :key="key"
      :name="key"
      v-bind="field"
      :disabled="isPending"
    />

    <button type="submit" class="btn btn-primary btn-lg place-self-end" :disabled="isPending">
      <div v-if="isPending" class="loading loading-spinner"></div>
      <span>Sign up</span>
    </button>
  </form>
</template>

<style scoped></style>
