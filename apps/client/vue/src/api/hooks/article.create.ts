import { useRouter } from 'vue-router';

import { useClient } from '../client';

export const useCreateArticle = () => {
  const router = useRouter();
  const client = useClient();

  const mutation = client.article.createArticle.useMutation({
    onSuccess: () => {
      router.push(`/`);
    },
  });

  return mutation;
};
