import { useEffect } from 'react';

import { useToken } from '../../hooks/token';
import { useClient } from '../client';

export function useRegister() {
  const [, setToken] = useToken();
  const result = useClient().user.createUser.useMutation();

  useEffect(() => {
    if (!result.isSuccess) return;
    setToken(result.data.body.user.token);
  }, [result.data?.body.user.token, result.isSuccess, setToken]);

  return result;
}
