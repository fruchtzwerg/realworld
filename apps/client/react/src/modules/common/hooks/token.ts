import { atom, useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { useUpdateEffect } from 'react-use';

const tokenAtom = atom(localStorage.getItem('token'));

export const useToken = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const navigate = useNavigate();

  useUpdateEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');

    navigate('/');
  }, [token]);

  return [token, setToken] as const;
};
