import { useToken } from '../../hooks/token';
import { useClient } from '../client';

export function useLogin() {
  const [, setToken] = useToken();

  return useClient().user.login.useMutation({
    onSuccess: ({ body }) => {
      setToken(body.user.token);
    },
  });
}

export default useLogin;
