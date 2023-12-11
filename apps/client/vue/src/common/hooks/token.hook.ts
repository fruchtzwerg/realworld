import { useQueryClient } from '@tanstack/vue-query';
import { useLocalStorage } from '@vueuse/core';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

export const useToken = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const token = useLocalStorage<string | null>('token', null);

  watch(token, async (value) => {
    if (value) return;

    await router.push('/login');

    queryClient.setQueriesData({ queryKey: ['user'] }, null);
    queryClient.removeQueries({ queryKey: ['user'] });
  });

  return token;
};
