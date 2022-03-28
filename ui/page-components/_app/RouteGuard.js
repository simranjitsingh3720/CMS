import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextResponse, NextRequest } from 'next/server';

function RouteGuard({ children, session }) {
  const router = useRouter();
  useEffect(() => {
    if (session.user) {
      if (router.pathname.includes('/admin/signup') || router.pathname.includes('/admin/signin')) {
        router.push('/admin', '/admin', { shallow: true });
        // NextResponse.redirect('/admin');
      }
    } else if (!router.pathname.includes('/admin/signup') && !router.pathname.includes('/admin/signin')) {
      router.push('/admin/signin', '/admin/signin', { shallow: true });
      // NextResponse.redirect('/admin/signin');
    }
  }, [router, session.user]);

  return children;
}

export default RouteGuard;
