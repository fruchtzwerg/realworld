import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export interface AppContext {
  setHeader: Dispatch<SetStateAction<ReactNode>>;
}

export interface PageProps {
  header: ReactNode;
}

export const useHeader = (header: ReactNode) => {
  const { setHeader } = useOutletContext<AppContext>();

  useEffect(() => {
    setHeader(header);
    return () => setHeader(null);
  }, [header, setHeader]);
};
