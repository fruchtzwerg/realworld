import { useMutation } from '@tanstack/react-query';

import { useToken } from '../../hooks/token';
import { useClient } from '../client';

export function useLogin() {
  const [, setToken] = useToken();
  const client = useClient();

  return useMutation(
    client.user.login.mutationOptions({
      onSuccess: (res) => {
        setToken(res.user.token);
      },
    })
  );
}

export default useLogin;
