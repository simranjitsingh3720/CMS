import { useRouter } from 'next/router';
import { useEffect } from 'react';

function RouteGuard({ children, session }) {
  console.log("children ", children);
  console.log("session ", session);
  const router = useRouter();

  console.log('abc', { session });

  useEffect(() => {
    if (session?.user) {
      console.log('session exists');
      if (router.pathname.includes('/admin/signup') || router.pathname.includes('/admin/signin')) {
        router.replace('/admin');
      }
    } else {
      console.log('session does not exist');
      if (!router.pathname.includes('/admin/signup') && !router.pathname.includes('/admin/signin')) {
        router.replace('/admin/signin');
      }
    }
  }, [router, session?.user]);

  return children;
}

export default RouteGuard;
