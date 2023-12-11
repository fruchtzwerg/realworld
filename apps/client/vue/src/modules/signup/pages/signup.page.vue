<script setup lang="ts">
// defineProps<{}>()
</script>

<template>
  <div class="flex flex-col max-w-xl mt-6 space-y-4">
    <h1 class="text-[2.5rem] leading-[2.75rem] font-medium place-self-center">
      Sign in
    </h1>
    <p class="!mt-2 text-primary place-self-center">Have an account?</p>

    <input
      type="text"
      class="input input-bordered input-lg"
      placeholder="Username"
    />
    <input
      type="text"
      class="input input-bordered input-lg"
      placeholder="Email"
    />
    <input
      type="password"
      class="input input-bordered input-lg"
      placeholder="Password"
    />

    <button class="btn btn-primary btn-lg place-self-end">Sign up</button>
  </div>
</template>

<style scoped></style>
