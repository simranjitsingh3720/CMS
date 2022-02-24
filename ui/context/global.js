import { SessionProvider } from './session';

function GlobalProvider({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

export default GlobalProvider;
