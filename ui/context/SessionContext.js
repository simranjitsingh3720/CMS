import { createContext } from 'react';
import { useRequest } from '../helpers/request-helper';

const SessionContext = createContext({});

export function SessionProvider({ children }) {
  const [{ data: session }, refetch] = useRequest({ method: 'GET', url: '/user/me' });
  const value = { session, refetch };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionContext;
