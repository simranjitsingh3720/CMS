import { useRouter } from 'next/router';
import { useEffect } from 'react';

function RouteGuard({ children, session }) {
  const router = useRouter();
  useEffect(() => {
    // if (session.user) {
    //   if (router.pathname.includes('/admin/signup') || router.pathname.includes('/admin/signin') || router.pathname.includes('/admin/forgot-password') || router.pathname.includes('/admin/password-change')) {
    //     router.replace('/admin', '/admin', { shallow: true });
    //   }
    // } else if (!router.pathname.includes('/admin/signup') && !router.pathname.includes('/admin/signin') && !router.pathname.includes('/admin/forgot-password') && !router.pathname.includes('/admin/password-change')) {
    //   router.replace('/admin/signin', '/admin/signin', { shallow: true });
    // }
  }, [router, session.user]);

  return children;
}

export default RouteGuard;
