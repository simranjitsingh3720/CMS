import { createContext, useEffect, useState } from 'react';
import { useRequest } from '../helpers/request-helper';

const SessionContext = createContext({});

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);

  const [{ }, handleGet] = useRequest({ method: 'GET', url: '/user/me' });
  // console.log(stateSession.data);
  // const { session: serverSession } = stateSession?.data || {};
  useEffect(() => {
    handleGet()
      .then((res) => {
        setSession(res.data.user);
      });
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionContext;
