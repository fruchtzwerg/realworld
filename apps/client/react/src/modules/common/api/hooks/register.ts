import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useToken } from '../../hooks/token';
import { useClient } from '../client';

export function useRegister() {
  const [, setToken] = useToken();
  const client = useClient();
  const result = useMutation(client.user.createUser.mutationOptions());

  useEffect(() => {
    if (!result.isSuccess) return;
    setToken(result.data.user.token);
  }, [result.data?.user.token, result.isSuccess, setToken]);

  return result;
}
