import { useRouter } from 'vue-router';

import { useApi } from '../client';
import { useMutation } from '@tanstack/vue-query';

export const useCreateArticle = () => {
  const router = useRouter();
  const api = useApi();

  const mutation = useMutation(
    api.article.createArticle.mutationOptions({
      onSuccess: () => {
        router.push(`/`);
      },
    })
  );

  return mutation;
};
